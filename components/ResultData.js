/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef } from "react";
import Meta from "./Meta";

// Used "const ResultData = ({ scrapedData })" instead of "const ResultData = (props.scrapedData) for readability
const ResultData = ({ scrapedData }) => {
  const audioRef = useRef();

  /*Convert Seconds to Minutes:Seconds Format */
  function convertDuration(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  useEffect(() => {
    // Use the Media Session API
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: scrapedData.title,
        artist: scrapedData.artist,
        artwork: [
          {
            src: `https://wsrv.nl/?url=${scrapedData.cover}&w=128&h=128`,
            sizes: "128x128",
            type: "image/jpg",
          },
          {
            src: `https://wsrv.nl/?url=${scrapedData.cover}&w=192&h=192`,
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: `https://wsrv.nl/?url=${scrapedData.cover}&w=256&h=256`,
            sizes: "256x256",
            type: "image/jpg",
          },
          {
            src: `https://wsrv.nl/?url=${scrapedData.cover}&w=384&h=384`,
            sizes: "384x384",
            type: "image/jpg",
          },
          {
            src: `https://wsrv.nl/?url=${scrapedData.cover}&w=512&h=512`,
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
  }, [scrapedData]);

  return (
    <>
      <Meta title={scrapedData.title || undefined} />
      {scrapedData.title && (
        <div className="flex items-center flex-col text-gray-900 dark:text-gray-200">
          <div className="mt-10 md:mt-32 mb-20 text-center max-w-sm">
            <h2 className="font-bold text-4xl my-1 uppercase p-2 sm:p-0">
              {scrapedData.title}
            </h2>
            <p className="mt-2">
              <span className="font-semibold">By:</span>{" "}
              <span className="text-md">{scrapedData.artist}</span>
            </p>
            <div className="mt-10 mx-auto p-4 background-image: url(/cover-placeholder.svg)">
              <h1 className="hidden">Cover:</h1>
              {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
              <a
                href={scrapedData.cover}
                rel="noreferrer noopener"
                target="_blank"
                alt={`${scrapedData.title} cover art`}
              >
                <picture>
                  <source
                    srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&output=webp&maxage=30d`}
                    type="image/webp"
                    className="rounded-2xl w-fill h-fill mx-auto shadow-2xl drop-shadow-xl"
                  />
                  <source
                    srcSet={`https://wsrv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
                    type="image/jpeg"
                    className="rounded-2xl w-fill h-fill mx-auto shadow-2xl drop-shadow-xl"
                  />
                  <img
                    src={`https://wsrv.nl/?url=${scrapedData.cover}&default=${process.env.NEXT_PUBLIC_HOST_URL}/cover-placeholder.svg&maxage=30d`}
                    alt={scrapedData.coverAltText}
                    className="rounded-2xl w-fill h-fill mx-auto shadow-2xl drop-shadow-xl transition-all duration-600 ease-in-out hover:scale-105"
                    loading="eager"
                  />
                </picture>
              </a>
            </div>
          </div>
          <div id="divider" className="p-0 lg:p-2"></div>
          <div className="flex flex-col items-center mt-0 xl:mb-40 text-center pb-10 xl:max-w-2xl">
            <h2 className="font-bold text-2xl mb-2 underline">Duration: </h2>
            <span className="text-md">
              {convertDuration(scrapedData.duration)}
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Release Date:</h2>
            <span className="max-w-lg text-md">{scrapedData.releaseDate}</span>
            <h2 className="font-bold text-2xl my-6 underline">Preview</h2>
            {scrapedData.previewURL !== undefined && (
              <audio controls ref={audioRef}>
                <source src={`${scrapedData.previewURL}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            {/*
              <h2 className="font-bold text-2xl my-6 underline">Embedded Preview</h2>
              {scrapedData.trackID !== undefined && (
                <iframe
                  className="rounded-lg"
                  src={`https://open.spotify.com/embed/${scrapedData.trackID}`}
                  frameBorder="0"
                  allowfullscreen=""
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )}
            */}
            <h2 className="font-bold text-2xl my-6 underline">Spotify URL:</h2>
            <span className="underline text-blue-500  w-80 sm:w-full text-md truncate">
              <a target="_blank" rel="noreferrer" href={`${scrapedData.url}`}>
                {scrapedData.url}
              </a>
            </span>
            <h2 className="font-bold text-2xl my-6 underline">
              Spotify App URL:
            </h2>
            <span className="underline text-blue-500  w-80 sm:w-full text-md truncate">
              <a
                target="_blank"
                rel="noreferrer"
                href={` spotify://${scrapedData.trackID}`}
              >
                spotify://{scrapedData.trackID}
              </a>
            </span>
            <h2 className="font-bold text-2xl my-6 underline">Spotify URI:</h2>
            <span className="max-w-lg text-md">
              spotify:{scrapedData.trackID.replace("track/", "track:")}
            </span>
            <h2 className="font-bold text-2xl my-6 underline">
              Last Scraped:{" "}
            </h2>
            <span className="text-md mb-60">
              <code>{scrapedData.lastScraped}</code>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultData;
