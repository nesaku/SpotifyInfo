import useSpotifyScraper from "@/hooks/useSpotifyScraper";
import SlugPage from "@/components/SlugPage";
import ArtistResultData from "@/components/ArtistResultData";

export default function ArtistSlug() {
  const { data, isLoading, error } = useSpotifyScraper("artist");
  return (
    <SlugPage type="artist" isLoading={isLoading} error={error}>
      {data && <ArtistResultData data={data} />}
    </SlugPage>
  );
}
