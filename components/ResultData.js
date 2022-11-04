import React from "react";
import { useState } from "react";

// Used "const ResultData = ({ scrapedData })" instead of "const ResultData = (props.scrapedData) for readability
const ResultData = ({ scrapedData }) => {
  return (
    /* Don't show result data if the title is not loaded */
    <div
      className={
        scrapedData.title
          ? "flex items-center flex-col text-gray-900 dark:text-gray-200"
          : "hidden"
      }
    >
      <div className="mt-10 md:mt-32 mb-20 text-center max-w-sm">
        <h2 className="font-bold text-4xl my-1 uppercase">
          {scrapedData.title}
        </h2>
        <p className="mt-2">
          <span className="font-semibold">By:</span>{" "}
          <span className="text-md">{scrapedData.artist}</span>
        </p>
        <div className="mt-10 mx-auto background-image: url(/cover-placeholder.svg)">
          <h1 className="hidden">Cover:</h1>
          {/* Load WebP Image With JPG Fallback & 404 Not Found Image*/}
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
              className="rounded-2xl w-fill h-fill mx-auto shadow-2xl drop-shadow-xl"
              loading="eager"
            />
          </picture>
        </div>
      </div>
      <div id="divider" className="p-0 lg:p-2"></div>
      <div className="flex flex-col items-center mt-0 xl:mb-40 text-center pb-10 xl:max-w-2xl">
        <h2 className="font-bold text-2xl mb-2 underline">Duration: </h2>
        <span className="text-md">{scrapedData.duration}</span>
        <h2 className="font-bold text-2xl my-6 underline">Release Date:</h2>
        <span className="max-w-lg text-md">{scrapedData.releaseDate}</span>
        <h2 className="font-bold text-2xl my-6 underline">Preview</h2>
        {scrapedData.previewURL !== undefined && (
          <audio controls>
            <source src={`${scrapedData.previewURL}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {/*
        <h2 className="font-bold text-2xl my-6 underline">Embeded Preview</h2>
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
        <h2 className="font-bold text-2xl my-6 underline">Spotify URL</h2>
        <span className="underline text-blue-500 w-xs md:w-lg text-xs md:text-md">
          <a href={`${scrapedData.url}`}>{scrapedData.url}</a>
        </span>
        <h2 className="font-bold text-2xl my-6 underline">Spotify URI</h2>
        <span className="max-w-lg text-md">
          spotify://{scrapedData.trackID}
        </span>
        <h2 className="font-bold text-2xl my-6 underline">Last scraped: </h2>
        <span className="text-md mb-60">
          <code>{scrapedData.lastScraped}</code>
        </span>
      </div>
    </div>
  );
};

export default ResultData;
