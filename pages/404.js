import Error from "next/error";

export default function Custom404() {
  return (
    <>
      <Error statusCode={404} title={"This page could not be found"} />
    </>
  );
}
