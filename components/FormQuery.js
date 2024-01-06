import { useState } from "react";
import Divider from "./aboutpage/Divider";
import Features from "./aboutpage/Features";
import FAQ from "./aboutpage/FAQ";
import { useRouter } from "next/router";

const FormQuery = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [validQuery, setValidQuery] = useState(true);

  // Push the input value to the track slug
  // TODO: Handle more Spotify URL/URI formats
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputValue.startsWith("https://open.spotify.com") ||
      inputValue.startsWith("http://open.spotify.com") ||
      inputValue.startsWith("spotify:")
    ) {
      router.push(
        inputValue
          .replace("http://", "https://")
          .replace("spotify://track/", "https://open.spotify.com/track/")
          .replace("spotify:track:", "https://open.spotify.com/track/")
          .replace("https://open.spotify.com/", " ")
      );
    } else {
      setValidQuery(false);
    }
  };

  return (
    <>
      <div className="flex flex-col text-center p-20 mb-20">
        <div className="visible pt-10 sm:pt-20 pb-10">
          <h1 className="font-extrabold text-transparent text-6xl sm:text-8xl bg-clip-text bg-gradient-to-br from-green-400 to-green-600 p-2 break-words">
            SpotifyInfo
          </h1>
          <h2 className="mt-10 text-2xl md:text-4xl text-transparent font-bold text-black dark:text-gray-200">
            Get Info About A Spotify Track:
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center text-center">
            <label className="flex flex-col">
              <h3 className="text-xlmd:text-2xl text-black dark:text-gray-200 font-semibold mb-10">
                Enter A Spotify URL/URI: &nbsp;
              </h3>
              <input
                className="rounded-md mx-10 py-3 px-5 text-left text-black text-sm  bg-slate-200 border-4 border-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="url"
                name="search"
                aria-label="Search"
                placeholder="https://open.spotify.com/track/3CRDbSIZ4r5MsZ0YwxuEkn"
                required
              />
            </label>
            {validQuery === false && (
              <div id="inputError">
                <p className="text-sm my-4 max-w-lg text-red-600/80 break-words">
                  Please make sure your URL/URI matches the correct format.
                </p>
              </div>
            )}
            <button className="font-semibold text-md text-white bg-green-500 ring ring-green-600 ring-offset-2 ring-offset-green-100 my-6 py-4 px-10 rounded-xl shadow-lg shadow-green-500 hover:shadow-xl hover:bg-green-600 transition duration-300 delay-40 hover:delay-40">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Divider />
      <Features />
      <Divider />
      <FAQ />
    </>
  );
};

export default FormQuery;
