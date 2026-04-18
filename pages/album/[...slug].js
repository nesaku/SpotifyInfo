import useSpotifyScraper from "@/hooks/useSpotifyScraper";
import SlugPage from "@/components/SlugPage";
import AlbumResultData from "@/components/AlbumResultData";

export default function AlbumSlug() {
  const { data, isLoading, error } = useSpotifyScraper("album");
  return (
    <SlugPage type="album" isLoading={isLoading} error={error}>
      {data && <AlbumResultData data={data} />}
    </SlugPage>
  );
}
