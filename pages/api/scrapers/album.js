import { extractNextData, buildPreviewURL, parseImages } from "./utils";

export default async function scrapeAlbum(url) {
  const res = await fetch(url);

  const albumData = extractNextData(await res.text())?.props?.pageProps?.state
    ?.data?.entity;
  if (!albumData) throw new Error("Album data not found");

  return {
    id: albumData.id,
    title: albumData.name,
    uri: albumData.uri,
    subtitle: albumData.subtitle,
    images: parseImages(albumData.visualIdentity?.image),
    tracks: (albumData.trackList ?? []).map((track, i) => ({
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
