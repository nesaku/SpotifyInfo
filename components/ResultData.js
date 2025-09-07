/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef, useState } from "react";
import Meta from "./Meta";
import Link from "next/link";

// Used "const ResultData = ({ trackData })" instead of "const ResultData = (props.scrapedData)" for readability
const ResultData = ({ trackData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef();

  /* Convert milliseconds to the Minutes:Seconds Format */
  function convertDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  console.log(trackData);

  useEffect(() => {
    // Use the Media Session API
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: trackData.name,
        artist: trackData.artists[0].name,
        artwork: [
          {
            src: `https://wsrv.nl/?url=${trackData.album.images[0].url}&w=384&h=384`,
            sizes: "384x384",
            type: "image/jpg",
          },
          {
            src: `https://wsrv.nl/?url=${trackData.album.images[0].url}&w=512&h=512`,
            sizes: "512x512",
            type: "image/jpg",
          },
        ],
      });

      // Action handlers for the media session
      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current.play();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current.pause();
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        audioRef.current.currentTime -= 10;
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        audioRef.current.currentTime += 10;
      });
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        audioRef.current.currentTime = details.seekTime;
      });
    }

    return () => {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.metadata = null;
      }
    };
  }, [trackData]);

  return (
    <>
      <Meta title={trackData.name || undefined} />
      {trackData.name && (
        <div className="flex items-center flex-col text-gray-900 dark:text-gray-200">
          <div className="mt-10 md:mt-32 mb-20 text-center max-w-sm">
            <h2 className="font-bold text-4xl my-1 uppercase p-2 sm:p-0">
              {trackData.name}
            </h2>
            <p className="mt-2">
              <span className="font-semibold">By:</span>{" "}
              <span className="text-md">
                <Link
                  href={`/artist/${trackData.artists[0].id}`}
                  className="text-md hover:underline hover:text-green-500"
                >
                  {trackData.artists[0].name}
                </Link>
              </span>
            </p>
            <div className="mt-10 mx-auto p-4 background-image: url(/cover-placeholder.svg)">
              <h1 className="hidden">Cover:</h1>
              {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
              <div className="relative w-full h-full">
                {isLoading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-gray-300 animate-pulse rounded-2xl shadow-2xl drop-shadow-xl"></div>
                )}
                <picture className="w-full h-full">
                  <source
                    srcSet={`https://wsrv.nl/?url=${trackData.album.images[0].url}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&output=webp&maxage=30d`}
                    type="image/webp"
                    className={`rounded-2xl w-fill h-fill mx-auto shadow-2xl drop-shadow-xl 
                      ${isLoading ? "hidden" : ""}`}
                  />
                  <source
                    srcSet={`https://wsrv.nl/?url=${trackData.album.images[0].url}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
                    type="image/jpeg"
                    className={`rounded-2xl w-fill h-fill mx-auto shadow-2xl drop-shadow-xl 
                      ${isLoading ? "hidden" : ""}`}
                  />
                  <img
                    src={`https://wsrv.nl/?url=${trackData.album.images[0].url}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
                    alt={trackData.name}
                    className={`rounded-2xl w-fill h-fill mx-auto shadow-2xl drop-shadow-xl transition-opacity duration-500 ease-in-out ${
                      isLoading ? "opacity-0" : "opacity-100"
                    }`}
                    loading="eager"
                    onLoad={() => setIsLoading(false)}
                  />
                </picture>
              </div>
            </div>
          </div>
          <div id="divider" className="p-0 lg:p-2"></div>
          <div className="flex flex-col items-center mt-0 xl:mb-40 text-center pb-10 xl:max-w-2xl">
            <h2 className="font-bold text-2xl mb-2 underline">Duration: </h2>
            <span className="text-md">
              {convertDuration(trackData.duration_ms)}
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Release Date:</h2>
            <span className="max-w-lg text-md">
              {trackData.album.release_date}
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Preview</h2>
            {trackData.preview_url && (
              <audio controls ref={audioRef}>
                <source
                  src={`/api/audioProxy?audioURL=${trackData.preview_url}`}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            )}
            <h2 className="font-bold text-2xl my-6 underline">Track URL:</h2>
            <span className="underline text-blue-500  w-80 sm:w-full text-md truncate">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${trackData.external_urls.spotify}`}
              >
                {trackData.external_urls.spotify}{" "}
              </a>
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Track URI:</h2>
            <span className="max-w-lg text-md">
              spotify:{trackData.id.replace("track/", "track:")}
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Album Name:</h2>
            <span className="w-80 sm:w-full text-md truncate">
              {trackData.album.name}
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Album URL:</h2>
            <span className="underline text-blue-500  w-80 sm:w-full text-md truncate">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${trackData.album.external_urls.spotify}`}
              >
                {trackData.album.external_urls.spotify}
              </a>
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Album URI:</h2>
            <span className="max-w-lg text-md">
              {trackData.album.uri.replace(
                "https://open.spotify.com/album/",
                "spotify:album:"
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultData;
