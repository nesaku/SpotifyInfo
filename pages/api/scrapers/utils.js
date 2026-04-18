export const extractNextData = (html) => {
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );
  if (!match?.[1]) throw new Error("Could not find __NEXT_DATA__");
  return JSON.parse(match[1]);
};

export const buildPreviewURL = (url) => {
  if (!url) return null;
  const host = process.env.NEXT_PUBLIC_HOST_URL;
  return url
    .replace(
      "https://p.scdn.co/mp3-preview/",
      `${host ? `${host}/proxy/` : "https://p.scdn.co/mp3-preview/"}`,
    )
    .split("?")[0];
};

export const parseImages = (images = []) => {
  const sorted = [...images].sort((a, b) => a.maxHeight - b.maxHeight);
  return {
    small: sorted[0]?.url ?? null,
    medium: sorted[1]?.url ?? null,
    large: sorted[2]?.url ?? null,
  };
};
