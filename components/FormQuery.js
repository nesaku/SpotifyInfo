import { useState } from "react";
import ResultData from "./ResultData";
import Loader from "./Loader";
import Footer from "./Footer";
import Divider from "./about-components/Divider";
import Features from "./about-components/Features";
import FAQ from "./about-components/FAQ";

const FormQuery = () => {
  const [inputValue, setInputValue] = useState("");
  const [scrapedData, setscrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isQuery, setIsQuery] = useState(true);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch("/api/spotifyScraper", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ queryURL: inputValue }),
    })
      .then((res) => res.json())
      .then((userData) => {
        setscrapedData(userData);
        setIsLoading(false);
        setIsQuery(false);
      });
  };

  return (
    <div className={isQuery ? "bg-transparent" : "dark:bg-gradientpage"}>
      {/* Show the loader when the page is loading*/}
      {isLoading && <Loader />}
      <main className={isLoading ? "hidden" : "flex justify-center"}>
        {/* Once query results are loaded, don't show the title text*/}
        <div
          className={
            isQuery ? "flex flex-col text-center p-20 mb-20" : "hidden"
          }
        >
          <div className={isQuery ? "visible pt-10 sm:pt-20 pb-10" : "hidden"}>
            <h1 className="font-extrabold text-transparent text-6xl sm:text-8xl bg-clip-text bg-gradient-to-br from-green-400 to-green-600 p-2">
              <a href={process.env.NEXT_PUBLIC_HOST_URL}>SpotifyInfo</a>
            </h1>
            <h2 className="mt-10 text-4xl text-transparent font-bold text-black dark:text-gray-200">
              Get Info About A Spotify Track:
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center text-center">
              <label className="flex flex-col">
                <h3 className="text-2xl text-black dark:text-gray-200 font-semibold mb-10">
                  Enter A Spotify Track URL: &nbsp;
                </h3>
                <input
                  className="rounded-md mx-10 py-3 px-5 text-left text-black text-sm  bg-slate-200 border-4 border-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  type="url"
                  placeholder="https://open.spotify.com/track/3CRDbSIZ4r5MsZ0YwxuEkn"
                  required
                />
              </label>
              <div className="mx-10 my-6 font-semibold text-lg text-red-600">
                <p>{scrapedData.error}</p>
              </div>
              <button className="font-semibold text-md text-white bg-green-500 ring ring-green-600 ring-offset-2 ring-offset-green-100 py-4 px-10 rounded-xl shadow-lg shadow-green-500 hover:shadow-xl hover:bg-green-600 transition duration-300 delay-40 hover:delay-40">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* If there is no query don't show the results component */}
        <section className={isQuery ? "hidden" : "flex"}>
          <ResultData scrapedData={scrapedData} />
        </section>
      </main>
      <div className={isLoading ? "hidden" : "visible"}>
        <div className={isQuery ? "visible" : "hidden"}>
          <Divider />
          <Features />
          <Divider />
          <FAQ />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FormQuery;
