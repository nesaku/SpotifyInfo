/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef, useState } from "react";
import Meta from "./Meta";
import Link from "next/link";

const ArtistResultData = ({ data }) => {
  const [currentAudio, setCurrentAudio] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [isBottom, setIsBottom] = useState(false);
  const [isHovered, setHovered] = useState(null);

  const audioRef = useRef();

  // Convert milliseconds into minutes:seconds
  function convertDuration(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  // Check if the bottom of the page is reached
  const checkBottom = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkBottom, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkBottom);
    };
  }, []);

  useEffect(() => {
    // Use the Media Session API
    if ("mediaSession" in navigator && currentAudio.imageURL) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentAudio.title,
        artist: currentAudio.artist,
        artwork: [
          {
            src: `https://wsrv.nl/?url=${currentAudio.imageURL}&w=384&h=384`,
            sizes: "384x384",
            type: "image/jpg",
          },
          {
            src: `https://wsrv.nl/?url=${currentAudio.imageURL}&w=512&h=512`,
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

    // Load the new audio when currentAudioURL changes
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }

    return () => {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.metadata = null;
      }
    };
  }, [currentAudio]);

  return (
    <>
      <Meta title={data.name || undefined} />
      <div
        id="hero"
        className="flex flex-col lg:flex-row h-full w-full justify-around items-center align-middle py-12 px-6 text-left"
      >
        <div className="relative">
          <img
            className="absolute inset-0 -full h-full object-cover blur-2xl opacity-90"
            src={data.artist.images[0].url}
            alt="Blurred Image"
          />

          <img
            className="relative h-72 w-72 lg:min-h-72 lg:min-w-72 object-cover rounded-md"
            src={data.artist.images[0].url}
            alt="Main Image"
          />
        </div>

        <div id="listInfo" className="px-2 lg:px-8 py-8  max-w-6xl">
          <p className="capitalize text-sm pb-1 text-center lg:text-start">
            {data.artist.type}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-center lg:text-start py-8">
            {data.artist.name}
          </h1>
          <p
            id="followers"
            className="capitalize text-md pb-1 text-center lg:text-start"
          >
            {data.artist.followers.total} Followers
          </p>
          <div
            id="genres"
            className="flex justify-center lg:justify-start mt-6"
          >
            {data.artist.genres.map((genre, index) => (
              <p
                key={index}
                /* className="mr-2 rounded-full border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm  text-gray-800 dark:text-gray-200 cursor-pointer transition duration-200 ease-in-out hover:bg-green-100 dark:hover:bg-green-900 hover:scale-105 hover:border-green-500 dark:hover:border-green-400" */
                className="mr-2 rounded-full border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm  text-gray-800 dark:text-gray-200 cursor-pointer transition duration-200 ease-in-out hover:bg-green-100 dark:hover:bg-green-900 hover:border-green-500 dark:hover:border-green-400"
              >
                {genre}
              </p>
            ))}
          </div>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={` https://open.spotify.com/artists/${data.artist.id}`}
            className="flex justify-center lg:justify-start  text-lg text-center lg:text-start text-green-600 hover:underline pt-8"
          >
            https://open.spotify.com/artists/{data.artist.id}
          </a>
        </div>
      </div>
      <div
        id="listHeadings"
        className="grid grid-cols-4 text-center lg:pt-16 pb-2 px-4 lg:px-8"
      >
        <div className="flex-1 text-center sm:pl-6 lg:pl-10">#</div>
        <div className="flex-1 text-center">Title</div>
        <div className="flex-1 text-center">Artist</div>
        <div className="flex-1 text-center sm:pr-12">Duration</div>
      </div>
      <div id="divider" className="w-full flex justify-center items-center">
        <div className="w-[95%] border-b-2 border-gray-700 rounded-full"></div>
      </div>
      {data &&
        data.topTracks.map((track, i) => (
          <div
            key={i}
            id="trackItem"
            className={`flex flex-row mx-auto w-[95%] align-middle items-center text-center p-3 lg:px-8 ${
              currentAudio.title === track.name
                ? "bg-green-300 dark:bg-green-800"
                : "bg-white/20 dark:bg-slate-800/30 sm:hover:bg-green-300 sm:dark:hover:bg-green-800"
            } border-b border-x border-gray-800/30 dark:border-gray-600/30 transition duration-300 hover:delay-40 rounded-b-sm`}
            onDoubleClick={() =>
              setCurrentAudio({
                title: track.name,
                audioURL: track.preview_url,
                artist: track.artists[0].name,
                imageURL: data.artist.images[0].url,
              })
            }
          >
            <div
              id="itemNumber"
              className="flex-1 text-center relative"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <p
                className={`transition-opacity duration-200 ${
                  isHovered === i ? "opacity-0" : "opacity-100"
                }`}
              >
                {i + 1}
              </p>
              <button
                className={`absolute inset-0 flex justify-center items-center transition-opacity duration-200 ${
                  isHovered === i ? "opacity-100" : "opacity-0"
                }`}
                onClick={() =>
                  setCurrentAudio({
                    title: track.name,
                    audioURL: track.preview_url,
                    artist: track.artists[0].name,
                    imageURL: data.artist.images[0].url,
                  })
                }
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

            {track.images && (
              <div id="albumArtSection" className="flex-1 text-center">
                <img
                  id="albumArt"
                  alt={`${track.name} album art`}
                  loading="lazy"
                  src={track.images[2].url}
                  className={`w-20 h-auto rounded-lg transition-opacity duration-200 ${
                    currentAudio.title === track.name
                      ? "opacity-40"
                      : "group-hover:opacity-50"
                  } ${
                    loadedImages[track.images[2].url] && "ring-2 ring-green-700"
                  }`}
                />
              </div>
            )}
            <div id="trackName" className="flex-1 text-center">
              <Link
                href={track.uri.replace("spotify:track:", "/track/")}
                className="text-md font-bold hover:underline hover:text-green-500"
              >
                {track.name}
              </Link>
            </div>
            <div id="artist" className="flex-1 text-center">
              {track.artists.map((artist, index) => (
                <span key={index}>{(index ? ", " : "") + artist.name}</span>
              ))}
            </div>
            <div id="duration" className="flex-1 text-center">
              <p>{convertDuration(track.duration_ms)}</p>
            </div>
          </div>
        ))}
      {currentAudio.audioURL && (
        <div
          id="previewAudio"
          className={`flex justify-center items-center rounded-t-[60px] py-6 w-full bg-gray-800 text-white p-4 fixed bottom-0 transition-all duration-300 ease-in-out ${
            isBottom ? "transform translate-y-full" : ""
          }`}
        >
          {/* TODO: Style the audio player */}
          <audio autostart="0" controls ref={audioRef} className="lg:w-96">
            <source
              src={`/api/audioProxy?audioURL=${currentAudio.audioURL}`}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </>
  );
};

export default ArtistResultData;
