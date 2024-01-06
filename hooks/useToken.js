import { useState, useEffect } from "react";

const useToken = () => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    // console.log("Checking token...");
    const storedData = JSON.parse(localStorage.getItem("spotifyToken"));
    if (storedData) {
      if (storedData.accessTokenExpirationTimestampMs > Date.now()) {
        setAuthData(storedData);
        // console.log("Existing token is valid.");
      } else {
        fetchNewToken();
        // console.log("Existing token has expired.");
      }
    } else {
      fetchNewToken();
      // console.log("No existing token found.");
    }
  }, []);

  const fetchNewToken = async () => {
    const res = await fetch(`/api/getToken`, {
      method: "GET",
      /*       headers: {
        Authorization: "Bearer " + authData.accessToken,
        "content-type": "application/json",
      }, */
    });
    if (res.ok) {
      const newData = await res.json();
      localStorage.setItem("spotifyToken", JSON.stringify(newData));
      setAuthData(newData);
      // console.log("Fetched new token.");
    } else {
      console.error(`An error occurred fetching token`);
    }
  };

  return authData;
};

export default useToken;
