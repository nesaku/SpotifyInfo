import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "@/components/Loader";
import ResultData from "@/components/ResultData";
import useToken from "@/hooks/useToken";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [fetchedData, setFetchedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const authData = useToken();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/getData`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: "track",
          slug: slug,
          auth: authData,
        }),
      });
      /*   const res = await fetch(`https://api.spotify.com/v1/tracks/${slug}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + "123",
          "User-Agent":
            process.env.NEXT_PUBLIC_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        },
      }); */
      /* const res = await fetch("https://api.spotify.com/v1/tracks/${slug}", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://open.spotify.com/track/${slug}`,
        }),
      }); */
      if (res.ok) {
        const data = await res.json();
        setFetchedData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(true);
      }
    };

    if (slug && authData != null) {
      fetchData();
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
          {!isLoading && fetchedData && <ResultData trackData={fetchedData} />}
        </>
      )}
    </>
  );
};

export default Slug;
