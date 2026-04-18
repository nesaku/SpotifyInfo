import { useEffect, useState } from "react";

export default function useScrollBottom(offset = 50) {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      setIsBottom(scrollTop + window.innerHeight + offset >= scrollHeight);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [offset]);

  return isBottom;
}
