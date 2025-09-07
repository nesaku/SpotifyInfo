const GetData = async (req, res) => {
  const playlistFields = `
    description,
    id,
    uri,
    type,
    images,
    name,
    owner,
    tracks(
        items,
        next,
        previous,
        total
    )`;

  const albumFields = `album_type,total_tracks,external_urls,href,id,images,name,release_date,type,uri,artists,tracks(href,limit,next,offset,previous,total,items(artists,disc_number,duration_ms,explicit,external_urls,href,id,name,preview_url,track_number,type,uri))`;

  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({
      status: "Error 405 - Method Not Allowed",
    });
  }

  try {
    if (req.body.type === "track") {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${req.body.slug}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + req.body.auth.accessToken,
            "User-Agent":
              process.env.NEXT_PUBLIC_USER_AGENT ||
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          },
        }
      );

      if (!response.ok) throw new Error("Fetch request failed");
      const data = await response.json();
      res.statusCode = 200;
      return res.json(data);
    }

    if (req.body.type === "playlist") {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${req.body.slug}?fields=${playlistFields}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + req.body.auth.accessToken,
            "User-Agent":
              process.env.NEXT_PUBLIC_USER_AGENT ||
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          },
        }
      );
      if (!response.ok) throw new Error("Fetch request failed");
      const data = await response.json();
      res.statusCode = 200;
      return res.json(data);
    }

    if (req.body.type === "album") {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${req.body.slug}?fields=${albumFields}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + req.body.auth.accessToken,
            "User-Agent":
              process.env.NEXT_PUBLIC_USER_AGENT ||
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          },
        }
      );

      if (!response.ok) throw new Error("Fetch request failed");
      const data = await response.json();
      res.statusCode = 200;
      return res.json(data);
    }

    // TODO: add support for artist routes
    if (req.body.type === "artist") {
      res.statusCode = 501;
      return res.json({
        status: "Error 501 - Route not implemented",
      });
    }

    res.statusCode = 400;
    return res.json({
      status: "Error 400 - Invalid Request Type",
    });
  } catch (error) {
    res.statusCode = 404;
    return res.json({
      status: "Error 404 - Not Found",
    });
  }
};

export default GetData;
