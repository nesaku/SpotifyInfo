import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useSpotifyScraper(type) {
  const {
    query: { slug },
  } = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          // Send clean open.spotify.com URL — the API converts it to embed
          body: JSON.stringify({
            queryURL: `https://open.spotify.com/${type}/${slug}`,
          }),
        });
        if (!res.ok) throw new Error();
        const { data } = await res.json();
        setData(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, type]);

  return { data, isLoading, error };
}
