import Error from "next/error";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Custom404() {
  return (
    <>
      <Header />
      <Error statusCode={404} title={"This page could not be found"} />
      <Footer />
    </>
  );
}
