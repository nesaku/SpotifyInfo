const audioProxy = async (req, res) => {
  try {
    const audioURL = req.query.audioURL;
    const url = new URL(audioURL);

    if (
      url.hostname !== "p.scdn.co" ||
      !url.pathname.startsWith("/mp3-preview/")
    ) {
      res.status(401).send("Unauthorized URL");
      return;
    }

    /*  The pathname alone can also be checked using url.hostname
        if (!url.pathname.startsWith("/mp3-preview/")) {
      // error code here
        }
    */

    const response = await fetch(audioURL, {
      method: "GET",
      headers: new Headers({
        "User-Agent": process.env.NEXT_PUBLIC_USER_AGENT
          ? process.env.NEXT_PUBLIC_USER_AGENT
          : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.3",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).send("An internal server error occurred.");
  }
};

export default audioProxy;
