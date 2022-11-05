const cheerio = require("cheerio");

const spotify = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL;

    try {
      {
        /*const response = await fetch(`${scrapeURL}`);*/
      }
      const response = await fetch(`${scrapeURL}`, {
        method: "GET",
        headers: new Headers({
          /* 
        "User-Agent"   : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
        */
          "User-Agent": process.env.NEXT_PUBLIC_USER_AGENT,
        }),
      });
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const cover = $('meta[property="og:image"]').attr("content");
      const title = $('meta[property="og:title"]').attr("content");
      const artist = $('meta[property="og:description"]')
        .attr("content")
        .replace("Song · ", "");
      const url = $('meta[property="og:url"]').attr("content");
      const uri = $('meta[name="al:android:url"]').attr("content");
      const trackID = $('meta[name="al:android:url"]')
        .attr("content")
        .replace("spotify://", "");
      const releaseDate = $('meta[name="music:release_date"]').attr("content");
      const duration = $('meta[name="music:duration"]').attr("content");
      const previewURL = $('meta[name="music:preview_url:secure_url"]')
        .attr("content")
        .replace(
          "https://p.scdn.co/mp3-preview/",
          `${process.env.NEXT_PUBLIC_HOST_URL}/proxy/`
        );
      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      return res.json({
        scrapeURL: scrapeURL,
        cover: cover,
        title: title,
        artist: artist,
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
  }
};

export default spotify;
