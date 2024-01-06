import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "@/components/Loader";
import useToken from "@/hooks/useToken";
import PlaylistResultData from "@/components/PlaylistResultData";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const authData = useToken();

  const fields = `
  description,
  id,
  uri,
  type,
  images,
  name,
  owner,
  tracks(
      items(
          added_at,
          track(!available_markets),
          track(
              album(!available_markets)
          )
      ),
      next,
      previous,
      total
  )`;

  useEffect(() => {
    setIsLoading(true);
    // console.log("Started fetching data");

    const fetchData = async () => {
      const res = await fetch(`/api/getData`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: "playlist",
          slug: slug,
          auth: authData,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setData(data);
        setIsLoading(false);
        // console.log("Successfully fetched data");
      } else {
        setIsLoading(false);
        setError(true);
        // console.log("Failed to fetch data");
      }
    };

    /* Fetch Spotify API directly
    
    const fetchData = async () => {
      const res = await fetch(
        `https://api.spotify.com/v1/playlists/${slug}?fields=${fields}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authData.accessToken,
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setData(data);
        setIsLoading(false);
        // console.log("Successfully fetched data");
      } else {
        setIsLoading(false);
        setError(true);
        // console.log("Failed to fetch data");
      }
    }; 
    */

    if (slug && authData != null) {
      fetchData();
      // console.log("Fetch function called");
    }
  }, [slug, authData]);

  // Handle what to show based on the status of the API request
  return (
    <>
      {error && (
        <div className="flex flex-col justify-center max-w-2xl text-center mx-auto h-[74vh]">
          <h1 id="error" className="text-red-600 font-bold text-5xl uppercase">
            Error - Track Not Found
          </h1>
          <h2 className="my-12 text-lg text-black font-bold dark:text-gray-100">
            An Example Of A Valid Query Is:
            <p className="font-normal">
              https://open.spotify.com/track/3CRDbSIZ4r5MsZ0YwxuEkn
            </p>
          </h2>
          <div className=" mx-auto font-semibold text-md text-gray-900 dark:text-white bg-green-500 ring ring-green-600 ring-offset-2 ring-offset-green-100 py-5 px-2 rounded-xl shadow-lg shadow-green-500 hover:shadow-xl hover:bg-green-600 transition duration-300 delay-40 hover:delay-40">
            <Link href="/">Go Back Home</Link>
          </div>
        </div>
      )}
      {!error && (
        <>
          {isLoading && <Loader />}
          {!isLoading && data && <PlaylistResultData data={data} />}
        </>
      )}
    </>
  );
};

export default Slug;
