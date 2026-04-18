import { useEffect, useRef, useState } from "react";
import Meta from "./Meta";
import Link from "next/link";

const ResultData = ({ trackData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const audioRef = useRef();

  const convertDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: trackData.title,
      artist: trackData.artist,
      artwork: [
        { src: trackData.images.medium, sizes: "300x300", type: "image/jpg" },
        { src: trackData.images.large, sizes: "640x640", type: "image/jpg" },
      ],
    });

    const handlers = {
      play: () => audioRef.current?.play(),
      pause: () => audioRef.current?.pause(),
      seekbackward: () => {
        audioRef.current.currentTime -= 10;
      },
      seekforward: () => {
        audioRef.current.currentTime += 10;
      },
      seekto: (d) => {
        audioRef.current.currentTime = d.seekTime;
      },
    };

    Object.entries(handlers).forEach(([action, handler]) =>
      navigator.mediaSession.setActionHandler(action, handler),
    );

    return () => {
      Object.keys(handlers).forEach((action) =>
        navigator.mediaSession.setActionHandler(action, null),
      );
      navigator.mediaSession.metadata = null;
    };
  }, [trackData]);

  const coverImage = trackData.images.large ?? trackData.images.medium;
  const wsrvURL = (url) => `https://wsrv.nl/?url=${url}&maxage=30d`;

  return (
    <>
      <Meta title={trackData.title} />

      <div className="flex items-center flex-col text-gray-900 dark:text-gray-200">
        {/* Header */}
        <div className="mt-10 mb-8 md:mt-32 text-center max-w-sm">
          <h1 className="font-bold text-4xl my-1 uppercase p-2 sm:p-0">
            {trackData.title}
          </h1>
          <p className="mt-2">
            <span className="font-semibold">By: </span>
            <Link
              href={`/artist/${trackData.artist_uri.replace("spotify:artist:", "")}`}
              className="text-md hover:underline hover:text-green-500"
            >
              {trackData.artist}
            </Link>
          </p>

          {/* Cover art */}
          <div className="mt-10 mx-auto p-4">
            <div className="relative w-full h-full">
              {!imageLoaded && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-300 animate-pulse rounded-2xl shadow-2xl" />
              )}
              <picture>
                <source
                  srcSet={`${wsrvURL(coverImage)}&output=webp`}
                  type="image/webp"
                />
                <img
                  src={wsrvURL(coverImage)}
                  alt={trackData.title}
                  className={`rounded-2xl mx-auto shadow-2xl drop-shadow-xl transition-opacity duration-500 ease-in-out ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col items-center mt-0 xl:mb-40 text-center pb-10 xl:max-w-2xl">
          {/* Preview */}
          <div id="audioPreview" className="mb-6">
            <h2 className="font-bold text-2xl mb-6 underline">Preview</h2>
            {trackData.audio_preview_url ? (
              <audio controls ref={audioRef}>
                <source src={trackData.audio_preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-gray-500">No preview available</p>
            )}
          </div>

          <h2 className="font-bold text-2xl mb-2 underline">Duration</h2>
          <span className="text-md">
            {convertDuration(trackData.duration_ms)}
          </span>

          <h2 className="font-bold text-2xl my-6 underline">Release Date</h2>
          <span className="text-md">{trackData.release_date ?? "Unknown"}</span>

          <h2 className="font-bold text-2xl my-6 underline">Track URI</h2>
          <span className="text-md">{trackData.uri}</span>

          <h2 className="font-bold text-2xl my-6 underline">Track URL</h2>
          <span className="underline hover:text-green-500 w-80 sm:w-full text-md truncate">
            <a
              href={`https://open.spotify.com/track/${trackData.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {`https://open.spotify.com/track/${trackData.id}`}
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default ResultData;
