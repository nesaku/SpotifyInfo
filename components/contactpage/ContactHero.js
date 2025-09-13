import React from "react";

const ContactHero = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:mt-20">
        <div className="mx-auto max-w-3xl text-center text-gray-900 dark:text-white ">
          <h1 className="bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-7xl capitalize">
            Contact Us
          </h1>
          <h2 className="mt-20 text-2xl">
            Have something to say? Please feel free to open an issue on{" "}
            <a
              className="text-green-600 dark:text-green-500 underline"
              href="https://github.com/nesaku/SpotifyInfo/issues"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>{" "}
            /{" "}
            <a
              className="text-green-600 dark:text-green-500 underline"
              href="https://codeberg.org/nesaku/SpotifyInfo/issues"
              target="_blank"
              rel="noreferrer"
            >
              Codeberg
            </a>{" "}
            or use the contact form below.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
