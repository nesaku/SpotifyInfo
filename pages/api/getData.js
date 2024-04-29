const GetData = async (req, res) => {
  const fields = `
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

  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({
      status: "Error 405 - Method Not Allowed",
    });
  }

  try {
    if (req.body.type === "playlist") {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${req.body.slug}?fields=${fields}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + req.body.auth.accessToken,
            "User-Agent":
              process.env.NEXT_PUBLIC_USER_AGENT ||
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          },
        }
      );
      if (!response.ok) throw new Error("Fetch request failed");
      const data = await response.json();
      res.statusCode = 200;
      return res.json(data);
    }
    // TODO: add support for album and artist routes
    if (req.body.type === "album") {
      res.statusCode = 501;
      return res.json({
        status: "Error 501 - Route not implemented",
      });
    }

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
