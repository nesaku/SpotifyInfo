import React from "react";
import ContactForm from "@/components/contactpage/ContactForm";
import ContactHero from "@/components/contactpage/ContactHero";
import Meta from "@/components/Meta";

const contact = () => {
  return (
    <>
      <Meta title="Contact" />
      {/* Title */}
      <ContactHero />
      {/* Contact Form */}
      <ContactForm />
    </>
  );
};

export default contact;
