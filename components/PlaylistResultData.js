/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef, useState } from "react";
import Meta from "./Meta";
import Link from "next/link";

const PlaylistResultData = ({ data }) => {
  const [currentAudio, setCurrentAudio] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [isBottom, setIsBottom] = useState(false);

  const audioRef = useRef();

  const handleImageLoad = (src) => {
    setLoadedImages((prevState) => ({ ...prevState, [src]: true }));
  };

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
      <Meta title={data.name + " Playlist" || undefined} />
      <div
        id="hero"
        className="flex flex-col lg:flex-row h-full w-full justify-around items-center align-middle py-12 px-6 text-left"
      >
        <div className="relative">
          <img
            className="absolute inset-0 -full h-full object-cover blur-2xl opacity-90"
            src={data.images[0].url}
            alt="Blurred Image"
          />

          <img
            className="relative h-72 w-72 lg:min-h-72 lg:min-w-72 object-cover rounded-md"
            src={data.images[0].url}
            alt="Main Image"
          />
        </div>
        <div id="listInfo" className="px-2 lg:px-8 py-8">
          <p className="capitalize text-sm pb-1 text-center lg:text-start">
            {data.type}
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-center lg:text-start py-8">
            {data.name}
          </h1>
          <div className="flex lg:pl-1 pt-2 justify-center lg:justify-start">
            <p>Created By: {data.owner.display_name}</p>
            <p className="pl-2"> - {data.tracks.total} Songs</p>
          </div>
          <p className="py-6 lg:py-12 text-lg text-center lg:text-start">
            {data.description.replace(/<[^>]+>/g, "")}
          </p>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={` https://open.spotify.com/playlist/${data.id}`}
            className="flex justify-center lg:justify-start text-lg text-center lg:text-start text-green-600 hover:underline"
          >
            https://open.spotify.com/playlist/{data.id}
          </a>
        </div>
      </div>
      <div
        id="listHeadings"
        className="flex flex-row align-middle items-center justify-evenly text-center lg:pt-16 pb-2 px-4 lg:px-8"
      >
        <div className="lg:flex-grow pr-4 max-w-20 lg:max-w-36 2xl:max-w-24">
          #
        </div>
        <div className="flex-grow break-words max-w-20 lg:max-w-36 2xl:max-w-24 px-1"></div>
        <div className="flex-grow break-words max-w-24 lg:max-w-36 2xl:max-w-24 px-1">
          Title
        </div>
        <div className="hidden lg:block flex-grow break-words max-w-20 lg:max-w-36 2xl:max-w-24 px-1">
          Album
        </div>
        <div className="hidden lg:block flex-grow break-words max-w-20 lg:max-w-36 2xl:max-w-24 px-1">
          Added on:
        </div>
        <div className="flex-grow break-words max-w-24 lg:max-w-36 2xl:max-w-24 px-1">
          Duration:
        </div>
      </div>
      <div id="divider" className="w-full flex justify-center">
        <div className="w-[95%] border-b-2 border-gray-700 rounded-full"></div>
      </div>

      {/* TODO: Deal with playlists with more than 100 songs and performance */}
      {data &&
        data.tracks.items.map((data, i) => (
          <div
            key={i}
            id="trackItem"
            className={`flex flex-row mx-auto w-[95%] align-middle items-center justify-evenly text-center p-3 lg:px-8  ${
              currentAudio.title === data.track.name
                ? " bg-green-300 dark:bg-green-800"
                : "bg-white/20 dark:bg-slate-800/30 sm:hover:bg-green-300 sm:dark:hover:bg-green-800 "
            }  border-b border-x border-gray-800/30 dark:border-gray-600/30  transition duration-300 delay-40 hover:delay-40 rounded-b-sm`}
            onDoubleClick={() =>
              setCurrentAudio({
                title: data.track.name,
                audioURL: data.track.preview_url,
                artist: data.track.artists[0].name,
                imageURL: data.track.album.images[0].url,
              })
            }
          >
            <div
              id="itemNumber"
              className="lg:flex-grow pr-4 max-w-20 lg:max-w-36 2xl:max-w-52"
            >
              <p>{i + 1}</p>
            </div>
            <div
              id="albumArtSection"
              className="flex-grow break-words max-w-20 lg:max-w-36 2xl:max-w-52 px-1 text-ellipsis overflow-hidden max-h-40"
            >
              <button
                onClick={() =>
                  setCurrentAudio({
                    title: data.track.name,
                    audioURL: data.track.preview_url,
                    artist: data.track.artists[0].name,
                    imageURL: data.track.album.images[0].url,
                  })
                }
              >
                <div className="relative group pt-1">
                  <img
                    id="albumArt"
                    alt={`${data.track.name} album art`}
                    loading="lazy"
                    onLoad={() =>
                      handleImageLoad(data.track.album.images[2].url)
                    }
                    src={data.track.album.images[2].url}
                    className={`w-20 h-auto rounded-lg shadow-sm drop-shadow-sm transition-opacity duration-200 ${
                      currentAudio.title === data.track.name
                        ? "opacity-40"
                        : " group-hover:opacity-50 "
                    } ${
                      loadedImages[data.track.album.images[2].url] &&
                      "ring-2 ring-green-700"
                    }`}
                  />
                  {currentAudio.title === data.track.name ? (
                    <svg
                      viewBox="0 0 104 120"
                      fill="currentColor"
                      className={`animate-pulse absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white opacity-100 transition-opacity duration-200`}
                    >
                      <path d="M4,32c-2.208,0-4,1.788-4,4v24c0,2.212,1.792,4,4,4s4-1.788,4-4V36C8,33.788,6.208,32,4,32z" />
                      <path d="M16,20c-2.208,0-4,1.788-4,4v48c0,2.212,1.792,4,4,4s4-1.788,4-4V24C20,21.788,18.208,20,16,20z" />
                      <path d="M52,32c-2.208,0-4,1.788-4,4v24c0,2.212,1.792,4,4,4s4-1.788,4-4V36C56,33.788,54.208,32,52,32z" />
                      <path d="M40,24c-2.208,0-4,1.788-4,4v40c0,2.212,1.792,4,4,4s4-1.788,4-4V28C44,25.788,42.208,24,40,24z" />
                      <path d="M28,12c-2.208,0-4,1.788-4,4v64c0,2.212,1.792,4,4,4s4-1.788,4-4V16C32,13.788,30.208,12,28,12z" />
                      <path d="M64,24c-2.208,0-4,1.788-4,4v40c0,2.212,1.792,4,4,4s4-1.788,4-4V28C68,25.788,66.208,24,64,24z" />
                      <path d="M100,32c-2.208,0-4,1.788-4,4v24c0,2.212,1.792,4,4,4s4-1.788,4-4V36C104,33.788,102.208,32,100,32z" />
                      <path d="M88,24c-2.208,0-4,1.788-4,4v40c0,2.212,1.792,4,4,4s4-1.788,4-4V28C92,25.788,90.208,24,88,24z" />
                      <path d="M76,16c-2.208,0-4,1.788-4,4v56c0,2.212,1.792,4,4,4s4-1.788,4-4V20C80,17.788,78.208,16,76,16z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 8 8"
                      fill="currentColor"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <path d="M4 0C1.79 0 0 1.79 0 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM3 2l3 2-3 2V2z"></path>
                    </svg>
                  )}
                </div>
              </button>
            </div>

            <div className="flex-grow break-words max-w-28 lg:max-w-36 2xl:max-w-52 px-1 text-ellipsis hover:transition-all hover:duration-50 ease-in-out overflow-hidden max-h-40 hover:max-h-full">
              <Link
                id="trackName"
                className="text-md font-bold hover:underline hover:text-green-500"
                href={data.track.uri.replace("spotify:track:", "/track/")}
              >
                <p>{data.track.name}</p>
              </Link>
              <p id="artistNames">
                {data.track.artists.map((data, i) => (
                  <span key={i}>
                    {/*  
                    TODO: Make link interactive once the artist route is added
                     <Link
                      className="text-xs"
                     
                      className="text-md hover:underline hover:text-green-600" 
                      
                      href={data.uri.replace("spotify:artist:", "/artist/")}
                    >  {(i ? ", " : "") + data.name}
                    </Link>
                    */}
                    {(i ? ", " : "") + data.name}
                  </span>
                ))}
              </p>
            </div>
            <div
              id="albumName"
              className="hidden lg:block flex-grow break-words max-w-20 lg:max-w-36 2xl:max-w-52 px-1 text-sm text-ellipsis overflow-hidden max-h-40"
            >
              <p>{data.track.album.name}</p>
            </div>
            <div
              id="dateAdded"
              className="hidden lg:block flex-grow break-words max-w-20 lg:max-w-36 2xl:max-w-52 px-1 text-ellipsis overflow-hidden max-h-40 "
            >
              <p>
                {new Date(data.added_at).toLocaleString("default", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
            <div
              id="duration"
              className="flex-grow break-words max-w-20 lg:max-w-36 2xl:max-w-52 px-1 text-ellipsis overflow-hidden max-h-40"
            >
              <p>{convertDuration(data.track.duration_ms)}</p>
            </div>
          </div>
        ))}

      {currentAudio.audioURL && (
        <div
          id="previewAudio"
          className={`flex justify-center rounded-t-[60px] py-6 w-full bg-gray-800 text-white p-4 fixed bottom-0 transition-all duration-300 ease-in-out ${
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

export default PlaylistResultData;
