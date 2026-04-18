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

export default function AlbumResultData({ data }) {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [hovered, setHovered] = useState(null);
  const audioRef = useRef();
  const isBottom = useScrollBottom();
  useMediaSession(currentAudio, audioRef);

  const playTrack = (track) =>
    setCurrentAudio({
      title: track.title,
      audioURL: track.audio_preview_url,
      artist: track.artist,
      imageURL: data.images.large,
    });

  const wsrvURL = (url) => `https://wsrv.nl/?url=${url}&maxage=30d`;

  return (
    <>
      <Meta title={data.title} />

      {/* Hero */}
      <div className="flex flex-col lg:flex-row h-full w-full justify-around items-center py-12 px-6">
        <div className="relative">
          <img
            className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-90"
            src={wsrvURL(data.images.large)}
            alt=""
          />
          <img
            className="relative h-72 w-72 object-cover rounded-md"
            src={wsrvURL(data.images.large)}
            alt={data.title}
          />
        </div>
        <div className="px-2 lg:px-8 py-8 max-w-6xl">
          <p className="capitalize text-sm pb-1 text-center lg:text-start">
            album
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-center lg:text-start py-8">
            {data.title}
          </h1>
          <p className="text-center lg:text-start">
            {data.subtitle} — {data.tracks.length} Tracks
          </p>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={`https://open.spotify.com/album/${data.id}`}
            className="flex justify-center lg:justify-start text-green-600 hover:underline pt-8"
          >
            https://open.spotify.com/album/{data.id}
          </a>
        </div>
      </div>

      {/* Headings */}
      <div className="grid grid-cols-3 text-center lg:pt-16 pb-2 px-4 lg:px-8">
        <div>#</div>
        <div>Title</div>
        <div>Duration</div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[95%] border-b-2 border-gray-700 rounded-full" />
      </div>

      {/* Track list */}
      {data.tracks.map((track, i) => (
        <div
          key={track.id}
          className={`flex flex-row mx-auto w-[95%] items-center text-center p-3 lg:px-8
            ${
              currentAudio?.title === track.title
                ? "bg-green-300 dark:bg-green-800"
                : "bg-white/20 dark:bg-slate-800/30 sm:hover:bg-green-300 sm:dark:hover:bg-green-800"
            }
            border-b border-x border-gray-800/30 dark:border-gray-600/30 transition duration-300 rounded-b-sm`}
          onDoubleClick={() => playTrack(track)}
        >
          <div
            className="flex-1 relative text-center"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <p
              className={`transition-opacity duration-200 ${hovered === i ? "opacity-0" : "opacity-100"}`}
            >
              {i + 1}
            </p>
            <button
              className={`absolute inset-0 flex justify-center items-center transition-opacity duration-200 ${hovered === i ? "opacity-100" : "opacity-0"}`}
              onClick={() => playTrack(track)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-500"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          <div className="flex-1 text-center">
            <Link
              href={`/track/${track.id}`}
              className="font-bold hover:underline hover:text-green-500"
            >
              {track.title}
            </Link>
            <p className="text-sm text-gray-500">{track.artist}</p>
          </div>

          <div className="flex-1 text-center">
            {convertDuration(track.duration_ms)}
          </div>
        </div>
      ))}

      {currentAudio?.audioURL && (
        <div
          className={`flex justify-center items-center rounded-t-[60px] py-6 w-full bg-gray-800 text-white p-4 fixed bottom-0 transition-all duration-300
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
