import { Secret, TOTP } from "otpauth";

export default async function handler(req, res) {
  try {
    // Get the latest TOTP secret using https://github.com/Thereallo1026/spotify-secrets
    const secretsRes = await fetch(
      "https://raw.githubusercontent.com/Thereallo1026/spotify-secrets/refs/heads/main/secrets/secretBytes.json",
      {
        headers: {
          "User-Agent":
            process.env.NEXT_PUBLIC_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
      }
    );
    if (!secretsRes.ok)
      throw new Error(`Failed to fetch secrets: ${secretsRes.statusText}`);
    const secrets = await secretsRes.json();

    // Take the latest secret version
    const { version, secret } = secrets[secrets.length - 1];

    // 3. Decode and transform the secret into an OTPAuth Secret
    const processed = secret.map((v, i) => v ^ ((i % version) + 9));
    const bufferToken = Buffer.from(processed.join(""), "utf8").toString("hex");
    const otpSecret = Secret.fromHex(bufferToken);

    // Get the server time
    const serverTimeRes = await fetch(
      "https://open.spotify.com/api/server-time/",
      {
        headers: {
          Referer: "https://open.spotify.com/",
          Origin: "https://open.spotify.com",
          "User-Agent":
            process.env.NEXT_PUBLIC_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
      }
    );
    if (!serverTimeRes.ok)
      throw new Error(
        `Failed to fetch server time: ${serverTimeRes.statusText}`
      );
    const { serverTime } = await serverTimeRes.json();

    // Generate the TOTP code
    const totp = new TOTP({
      secret: otpSecret,
      period: 30,
      digits: 6,
      algorithm: "SHA1",
    });
    const totpCode = totp.generate({ timestamp: serverTime * 1000 });

    const url = `https://open.spotify.com/api/token?reason=init&productType=web-player&totp=${totpCode}&totpServer=${totpCode}&totpVer=${version}`;

    const tokenRes = await fetch(url, {
      headers: {
        Referer: "https://open.spotify.com/",
        Origin: "https://open.spotify.com",
        "User-Agent":
          process.env.NEXT_PUBLIC_USER_AGENT ||
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      },
    });
    if (!tokenRes.ok)
      throw new Error(`Token request failed: ${tokenRes.statusText}`);

    const data = await tokenRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}
