import { extractNextData, buildPreviewURL } from "./utils";

export default async function scrapePlaylist(url) {
  const res = await fetch(url);
  const playlistData = extractNextData(await res.text())?.props?.pageProps
    ?.state?.data?.entity;

  if (!playlistData) throw new Error("Playlist data not found");

  return {
    id: playlistData.id,
    title: playlistData.name,
    uri: playlistData.uri,
    cover_art: playlistData.coverArt?.sources?.[0]?.url ?? null,
    tracks: (playlistData.trackList ?? []).map((track, i) => ({
      position: i + 1,
      id: track.uri.replace("spotify:track:", ""),
      uri: track.uri,
      title: track.title,
      artist: track.subtitle,
      duration_ms: track.duration,
      is_explicit: track.isExplicit,
      audio_preview_url: buildPreviewURL(track.audioPreview?.url),
    })),
  };
}
