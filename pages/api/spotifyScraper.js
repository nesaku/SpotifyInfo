const cheerio = require("cheerio");

const spotifyScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.split("?")[0];
    try {
      const response = await fetch(`${scrapeURL}`, {
        method: "GET",
        headers: new Headers({
          "User-Agent": process.env.NEXT_PUBLIC_USER_AGENT
            ? process.env.NEXT_PUBLIC_USER_AGENT
            : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.3",
        }),
      });
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const cover = $('meta[property="og:image"]').attr("content");

      const title = $('meta[property="og:title"]').attr("content");
      const artist = $('meta[property="og:description"]')
        .attr("content")
        .replace("Song · ", "");
      const album = $('meta[name="music:album"]').attr("content");
      const url = $('meta[property="og:url"]').attr("content");
      const uri = $('meta[name="al:android:url"]').attr("content");
      const trackID = $('meta[name="al:android:url"]')
        .attr("content")
        .replace("spotify://", "");
      const releaseDate = $('meta[name="music:release_date"]').attr("content");
      const duration = $('meta[name="music:duration"]').attr("content");
      const previewURL = $('meta[property="og:audio"]')
        .attr("content")
        .split("?")[0];
      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=600, stale-while-revalidate=1800"
      );
      return res.json({
        scrapeURL: scrapeURL,
        cover: cover,
        title: title,
        artist: artist,
        album: album,
        url: url,
        uri: uri,
        trackID: trackID,
        releaseDate: releaseDate,
        duration: duration,
        previewURL: previewURL,
        lastScraped: lastScraped,
      });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        scrapeURL: scrapeURL,
        error: `${scrapeURL} Not Found. An Example Of A Valid Query Is: https://open.spotify.com/track/3CRDbSIZ4r5MsZ0YwxuEkn`,
      });
    }
  } else {
    res.statusCode = 405;
    return res.json({
      status: "Error 405 - Method Not Allowed",
    });
  }
};

export default spotifyScraper;
