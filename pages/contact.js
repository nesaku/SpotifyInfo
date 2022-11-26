import React from "react";
import ContactForm from "../components/contactpage-components/ContactForm";
import ContactHero from "../components/contactpage-components/ContactHero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Meta from "../components/Meta";

const contact = () => {
  return (
    <div className="bg-gradient-to-tr from-green-50 to-green-100 dark:bg-gradientpage h-full">
      <Meta title="- Contact" />
      <Header />
      {/* Title */}
      <ContactHero />
      {/* Contact Form */}
      <ContactForm />
      <Footer />
    </div>
  );
};

export default contact;
