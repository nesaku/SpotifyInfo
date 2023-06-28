import React from "react";
import { useRouter } from "next/router";
import PathQuery from "../components/PathQuery";

const Slug = () => {
  /* Take the path from the URL and pass it to the PathQuery component */
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <PathQuery path={`${slug}`} />
    </div>
  );
};

export default Slug;
