import { useEffect } from "react";

export default function useMediaSession(currentAudio, audioRef) {
  useEffect(() => {
    if (!("mediaSession" in navigator) || !currentAudio?.imageURL) return;

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

    Object.entries(handlers).forEach(([a, h]) =>
      navigator.mediaSession.setActionHandler(a, h),
    );

    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }

    return () => {
      Object.keys(handlers).forEach((a) =>
        navigator.mediaSession.setActionHandler(a, null),
      );
      navigator.mediaSession.metadata = null;
    };
  }, [currentAudio, audioRef]);
}
