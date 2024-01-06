const getToken = async (req, res) => {
  try {
    const response = await fetch(
      "https://open.spotify.com/get_access_token?reason=transport&productType=web-player"
    );

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

export default getToken;
