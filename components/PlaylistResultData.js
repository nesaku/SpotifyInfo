/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useState } from "react";
import Meta from "./Meta";
import Link from "next/link";
import useMediaSession from "@/hooks/useMediaSession";
import useScrollBottom from "@/hooks/useScrollBottom";

const convertDuration = (ms) => {
  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(0);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

export default function PlaylistResultData({ data }) {
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef();
  const isBottom = useScrollBottom();
  useMediaSession(currentAudio, audioRef);

  const playTrack = (track) =>
    setCurrentAudio({
      title: track.title,
      audioURL: track.audio_preview_url,
      artist: track.artist,
      imageURL: data.cover_art,
    });

  const wsrvURL = (url) => `https://wsrv.nl/?url=${url}&maxage=30d`;
  return (
    <>
      <Meta title={`${data.title} Playlist`} />

      {/* Hero */}
      <div className="flex flex-col lg:flex-row h-full w-full justify-around items-center py-12 px-6">
        <div className="relative">
          <img
            className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-90"
            src={wsrvURL(data.cover_art)}
            alt=""
          />
          <img
            className="relative h-72 w-72 object-cover rounded-md"
            src={wsrvURL(data.cover_art)}
            alt={data.title}
          />
        </div>
        <div className="px-2 lg:px-8 py-8">
          <p className="capitalize text-sm pb-1 text-center lg:text-start">
            playlist
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-center lg:text-start py-8">
            {data.title}
          </h1>
          <p className="pl-1 text-center">{data.track_count} Songs</p>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={`https://open.spotify.com/playlist/${data.id}`}
            className="flex justify-center lg:justify-start text-green-600 hover:underline pt-4"
          >
            https://open.spotify.com/playlist/{data.id}
          </a>
        </div>
      </div>

      {/* Headings */}
      <div className="flex flex-row items-center justify-evenly text-center lg:pt-16 pb-2 px-4 lg:px-8">
        <div className="lg:flex-grow pr-4 max-w-20 lg:max-w-36">#</div>
        <div className="flex-grow max-w-20 lg:max-w-36 px-1"></div>
        <div className="flex-grow max-w-24 lg:max-w-36 px-1">Title</div>
        <div className="hidden lg:block flex-grow max-w-20 lg:max-w-36 px-1">
          Duration
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[95%] border-b-2 border-gray-700 rounded-full" />
      </div>

      {/* Track list */}
      {data.tracks.map((track) => (
        <div
          key={track.id}
          className={`flex flex-row mx-auto w-[95%] items-center justify-evenly text-center p-3 lg:px-8
            ${
              currentAudio?.title === track.title
                ? "bg-green-300 dark:bg-green-800"
                : "bg-white/20 dark:bg-slate-800/30 sm:hover:bg-green-300 sm:dark:hover:bg-green-800"
            }
            border-b border-x border-gray-800/30 dark:border-gray-600/30 transition duration-300 rounded-b-sm`}
          onDoubleClick={() => playTrack(track)}
        >
          <div className="lg:flex-grow pr-4 max-w-20 lg:max-w-36">
            {track.position}
          </div>

          {/* <div className="flex-grow max-w-20 lg:max-w-36 px-1">
            <button onClick={() => playTrack(track)}>
              <div className="relative group pt-1">
                <img
                    src={wsrvURL(data.cover_art)}
                  alt={track.title}
                  loading="lazy"
                  className={`w-20 h-auto rounded-lg shadow-sm transition-opacity duration-200
                    ${currentAudio?.title === track.title ? "opacity-40" : "group-hover:opacity-50"}`}
                />
                {currentAudio?.title === track.title ? (
                  <svg
                    viewBox="0 0 104 120"
                    fill="currentColor"
                    className="animate-pulse absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white"
                  >
                    <path d="M4,32c-2.208,0-4,1.788-4,4v24c0,2.212,1.792,4,4,4s4-1.788,4-4V36C8,33.788,6.208,32,4,32z" />
                    <path d="M28,12c-2.208,0-4,1.788-4,4v64c0,2.212,1.792,4,4,4s4-1.788,4-4V16C32,13.788,30.208,12,28,12z" />
                    <path d="M76,16c-2.208,0-4,1.788-4,4v56c0,2.212,1.792,4,4,4s4-1.788,4-4V20C80,17.788,78.208,16,76,16z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 8 8"
                    fill="currentColor"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <path d="M4 0C1.79 0 0 1.79 0 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM3 2l3 2-3 2V2z" />
                  </svg>
                )}
              </div>
            </button>
          </div> */}

          <div className="flex-grow max-w-28 lg:max-w-36 px-1 overflow-hidden">
            <Link
              href={`/track/${track.id}`}
              className="font-bold hover:underline hover:text-green-500"
            >
              {track.title}
            </Link>
            <p className="text-sm">{track.artist}</p>
          </div>

          <div className="flex-grow max-w-20 lg:max-w-36 px-1">
            {convertDuration(track.duration_ms)}
          </div>
        </div>
      ))}

      {/* Sticky player */}
      {currentAudio?.audioURL && (
        <div
          className={`flex justify-center rounded-t-[60px] py-6 w-full bg-gray-800 text-white p-4 fixed bottom-0 transition-all duration-300
          ${isBottom ? "translate-y-full" : ""}`}
        >
          <audio controls ref={audioRef} className="lg:w-96">
            <source src={currentAudio.audioURL} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </>
  );
}
