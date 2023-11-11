import { useState } from "react";
import ResultData from "./ResultData";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";

const SlugQuery = ({ path }) => {
  const [scrapedData, setScrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isQuery, setIsQuery] = useState(true);

  const handleClick = async () => {
    setIsLoading(true);

    /* Send the fetch request to scraperSlug API */
    fetch("/api/spotifyScraper", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        queryURL: `https://open.spotify.com/track/${path}`,
      }),
    })
      .then((res) => res.json())
      .then((userData) => {
        setScrapedData(userData);
        setIsLoading(false);
        setIsQuery(false);
      });
  };

  return (
    <div className="bg-gradient-to-tr from-green-50 to-green-100 dark:bg-gradienthero text-gray-900 dark:text-gray-100 min-h-screen">
      <Header />
      {isLoading && <Loader />}
      {/* Hide the Hero section when the ResultsData are present and when the page is loading*/}
      <main className={isLoading ? "hidden" : "dark:bg-gradienthero"}>
        <div
          className={
            isQuery ? "visible dark:bg-gradienthero min-h-screen" : "hidden"
          }
        >
          <div className="justify-center items-center text-center pt-28">
            <h1 className="font-extrabold text-transparent text-6xl md:text-8xl bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
              <a href={process.env.NEXT_PUBLIC_HOST_URL}>SpotifyInfo</a>
            </h1>
            <h2 className="my-10 text-4xl font-bold">
              Get Info About A Spotify Track:
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <code className="text-xs md:text-lg w-80 sm:w-full truncate">{`https://open.spotify.com/track/${path}`}</code>
            <br />
            <button
              onClick={handleClick}
              className="font-semibold text-md text-white bg-green-500 ring ring-green-600 ring-offset-2 ring-offset-green-100 py-4 px-6 my-12 rounded-xl shadow-lg shadow-green-500 hover:shadow-xl hover:bg-green-600 transition duration-300 delay-40 hover:delay-40"
            >
              Fetch Data
            </button>
          </div>
          <div className="mx-10 my-6 font-semibold text-lg text-red-600">
            <p>{scrapedData.error}</p>
          </div>
        </div>
        {/* If there is no query don't show the results component */}
        <div className="flex">
          <section className={isQuery ? "hidden" : "justify-center mx-auto"}>
            <ResultData scrapedData={scrapedData} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SlugQuery;
