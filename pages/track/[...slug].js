import useSpotifyScraper from "@/hooks/useSpotifyScraper";
import SlugPage from "@/components/SlugPage";
import ResultData from "@/components/ResultData";

export default function TrackSlug() {
  const { data, isLoading, error } = useSpotifyScraper("track");
  return (
    <SlugPage type="track" isLoading={isLoading} error={error}>
      {data && <ResultData trackData={data} />}
    </SlugPage>
  );
}
