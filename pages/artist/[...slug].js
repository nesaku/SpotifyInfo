import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "@/components/Loader";
import useToken from "@/hooks/useToken";
import ArtistResultData from "@/components/ArtistResultData";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const authData = useToken();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch(`/api/getData`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: "artist",
          slug: slug,
          auth: authData,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setData(data);
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

  return (
    <>
      {error && (
        <div className="flex flex-col justify-center max-w-2xl text-center mx-auto h-[74vh]">
          <h1 id="error" className="text-red-600 font-bold text-5xl uppercase">
            Error - Artist Not Found
          </h1>
          <h2 className="my-12 text-lg text-black font-bold dark:text-gray-100">
            An Example Of A Valid Query Is:
            <p className="font-normal">
              https://open.spotify.com/artist/2dIgFjalVxs4ThymZ67YCE
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

          {!isLoading && data && <ArtistResultData data={data} />}
        </>
      )}
    </>
  );
};

export default Slug;
