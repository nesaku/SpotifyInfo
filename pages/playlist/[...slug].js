import React, { useEffect, useState, useCallback } from "react";
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
  const [nextUrl, setNextUrl] = useState(null);

  const authData = useToken();

  const fetchData = useCallback(
    async (url = null) => {
      setIsLoading(true);
      const res = await fetch(`/api/getData`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: url ? "nextPage" : "playlist",
          slug: url || slug,
          auth: authData,
        }),
      });
      if (res.ok) {
        const newData = await res.json();

        // Check if the response is an initial vs nextPage fetch
        if (newData.tracks) {
          // Initial playlist fetch
          setData(newData);
          setNextUrl(newData.tracks.next);
        } else {
          // Use nextPage data to append the track data
          setData((prevData) => ({
            ...prevData,
            tracks: {
              ...prevData.tracks,
              items: [...prevData.tracks.items, ...newData.items],
              next: newData.next,
              previous: newData.previous,
            },
          }));
          setNextUrl(newData.next);
        }

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(true);
      }
    },
    [slug, authData]
  );

  useEffect(() => {
    setIsLoading(true);
    if (slug && authData != null) {
      fetchData();
    }
  }, [slug, authData, fetchData]);

  const fetchNextPage = () => {
    if (nextUrl) {
      fetchData(nextUrl);
    }
  };

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
          {!isLoading && data && (
            <PlaylistResultData
              data={data}
              fetchNextPage={fetchNextPage}
              nextUrl={nextUrl}
            />
          )}
        </>
      )}
    </>
  );
};

export default Slug;
