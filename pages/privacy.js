import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Meta from "../components/Meta";
import PrivacyHero from "../components/privacypage-components/PrivacyHero";

const privacy = () => {
  return (
    <div className="bg-gradient-to-tr from-green-50 to-green-100 dark:bg-gradientpage h-full">
      <Meta title="Privacy Policy" />
      <Header />
      {/* Title */}
      <PrivacyHero />
      <Footer />
    </div>
  );
};

export default privacy;
