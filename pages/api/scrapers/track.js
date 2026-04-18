import { extractNextData, buildPreviewURL, parseImages } from "./utils";

export default async function scrapeTrack(url) {
  //console.log("Fetching:", url);

  const res = await fetch(url);
  const html = await res.text();

  //console.log("Status:", res.status);
  //console.log("HTML snippet:", html.slice(0, 500));

  const nextData = extractNextData(html);
  const trackData = nextData?.props?.pageProps?.state?.data?.entity;

  //console.log("trackData type:", trackData?.type);
  //console.log("trackData name:", trackData?.name);

  if (!trackData) throw new Error("Track data not found");

  return {
    id: trackData.id,
    title: trackData.name,
    uri: trackData.uri,
    artist: trackData.artists?.[0]?.name ?? null,
    artist_uri: trackData.artists?.[0]?.uri ?? null,
    release_date: trackData.releaseDate?.isoString?.split("T")[0] ?? null,
    duration_ms: trackData.duration,
    is_explicit: trackData.isExplicit,
    audio_preview_url: buildPreviewURL(trackData.audioPreview?.url),
    images: parseImages(trackData.visualIdentity?.image),
  };
}
