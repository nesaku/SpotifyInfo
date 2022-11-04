import React from "react";
import AboutHero from "../components/aboutpage-components/AboutHero";
import Divider from "../components/aboutpage-components/Divider";
import FAQ from "../components/aboutpage-components/FAQ";
import Features from "../components/aboutpage-components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";

const about = () => {
  return (
    <div className="bg-gradient-to-tr from-green-50 to-green-100 dark:bg-gradientpage h-full">
      <Header />
      {/* Title */}
      <AboutHero />
      <Divider />
      {/* Features */}
      <Features />
      <Divider />
      {/* FAQ */}
      <FAQ />
      <Footer />
    </div>
  );
};

export default about;
