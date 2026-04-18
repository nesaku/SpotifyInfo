import scrapeTrack from "./scrapers/track";
import scrapePlaylist from "./scrapers/playlist";
import scrapeArtist from "./scrapers/artist";
import scrapeAlbum from "./scrapers/album";

const scrapers = {
  track: scrapeTrack,
  playlist: scrapePlaylist,
  artist: scrapeArtist,
  album: scrapeAlbum,
};

const getType = (url) =>
  Object.keys(scrapers).find((type) => url.includes(`/${type}/`)) ?? null;

const toEmbedURL = (url) => {
  // https://open.spotify.com/track/ID to https://open.spotify.com/embed/track/ID
  return url.replace("open.spotify.com/", "open.spotify.com/embed/");
};

// Route the request to the correct scraper
export default async function spotify(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawURL = req.body.queryURL.split("?")[0];
  const embedURL = toEmbedURL(rawURL);
  const type = getType(rawURL);

  if (!type) {
    return res.status(400).json({
      error: `Unsupported URL. Valid types: ${Object.keys(scrapers).join(", ")}`,
    });
  }

  try {
    const data = await scrapers[type](embedURL);
    return res.status(200).json({
      scrapeURL: rawURL,
      embedURL,
      type,
      lastScraped: new Date().toISOString(),
      data,
    });
  } catch (e) {
    console.error("Scraper error:", e.message);
    return res
      .status(404)
      .json({ scrapeURL: rawURL, embedURL, error: e.message });
  }
}
