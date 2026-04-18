import useSpotifyScraper from "@/hooks/useSpotifyScraper";
import SlugPage from "@/components/SlugPage";
import PlaylistResultData from "@/components/PlaylistResultData";

export default function PlaylistSlug() {
  const { data, isLoading, error } = useSpotifyScraper("playlist");
  return (
    <SlugPage type="playlist" isLoading={isLoading} error={error}>
      {data && <PlaylistResultData data={data} />}
    </SlugPage>
  );
}
