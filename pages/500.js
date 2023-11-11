import Error from "next/error";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Custom500() {
  return (
    <>
      <Header />
      <Error statusCode={500} title={"Internal Server Error"} />
      <Footer />
    </>
  );
}
