import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import ResultData from "../../components/ResultData";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [scrapedData, setScrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/spotifyScraper", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          queryURL: `https://open.spotify.com/track/${slug}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setScrapedData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(true);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // Handle what to show based on the status of the API request
  return (
    <div>
      <div className="bg-gradient-to-tr from-green-50 to-green-100 dark:bg-gradienthero text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        {error && (
          <div className="flex flex-col justify-center max-w-2xl text-center mx-auto h-[74vh]">
            <h1
              id="error"
              className="text-red-600 font-bold text-5xl uppercase"
            >
              Error - Track Not Found
            </h1>
            <h2 className="my-12 text-lg text-black font-bold dark:text-gray-100">
              An Example Of A Valid Query Is:
              <p className="font-normal">
                https://open.spotify.com/track/3CRDbSIZ4r5MsZ0YwxuEkn
              </p>
            </h2>
            <div className="mx-auto">
              <a
                href="/"
                className="font-semibold text-md text-gray-900 dark:text-white bg-green-500 ring ring-green-600 ring-offset-2 ring-offset-green-100 py-5 px-2 rounded-xl shadow-lg shadow-green-500 hover:shadow-xl hover:bg-green-600 transition duration-300 delay-40 hover:delay-40"
              >
                Go Back Home
              </a>
            </div>
          </div>
        )}
        {!error && (
          <>
            {isLoading && <Loader />}
            {!isLoading && scrapedData && (
              <ResultData scrapedData={scrapedData} />
            )}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Slug;
