import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-gradient-to-tr from-green-50 to-green-100 dark:bg-gradientpage text-gray-900 dark:text-gray-100  min-h-screen">
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
