import { extractNextData, buildPreviewURL, parseImages } from "./utils";

export default async function scrapeArtist(url) {
  const res = await fetch(url);
  const artistData = extractNextData(await res.text())?.props?.pageProps?.state
    ?.data?.entity;

  if (!artistData) throw new Error("Artist data not found");

  return {
    id: artistData.id,
    name: artistData.name,
    uri: artistData.uri,
    images: parseImages(artistData.visualIdentity?.image),
    top_tracks: (artistData.trackList ?? []).map((track, i) => ({
      position: i + 1,
      id: track.uri.replace("spotify:track:", ""),
      uri: track.uri,
      title: track.title,
      duration_ms: track.duration,
      is_explicit: track.isExplicit,
      audio_preview_url: buildPreviewURL(track.audioPreview?.url),
    })),
  };
}
