import React from "react";

const Footer = () => {
  return (
    <footer aria-label="Site Footer" className="text-center w-full mt-auto">
      <div className="flex justify-center items-center content-center  mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <nav
            aria-label="Footer Nav"
            className="rounded-3xl border-4 border-gray-900 p-6 dark:border-gray-700"
          >
            <ul className="flex flex-wrap justify-center items-center gap-6 text-sm font-bold">
              <li>
                <a
                  className="text-gray-900 transition hover:text-gray-900/75 dark:text-white dark:hover:text-white/75"
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}/`}
                  target="_self"
                  rel="noreferrer"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  className="text-gray-900 transition hover:text-gray-900/75 dark:text-white dark:hover:text-white/75"
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}/#faq`}
                  target="_self"
                  rel="noreferrer"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  className="text-gray-900 transition hover:text-gray-900/75 dark:text-white dark:hover:text-white/75"
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}/contact`}
                  target="_self"
                  rel="noreferrer"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  className="text-gray-900 transition hover:text-gray-900/75 dark:text-white dark:hover:text-white/75"
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}/privacy`}
                  target="_self"
                  rel="noreferrer"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  className="text-gray-900 transition hover:text-gray-900/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                  target="_self"
                  rel="noreferrer"
                >
                  Go To The Top
                </a>
              </li>
              <li className="items-center justify-center align-middle content-center">
                <a
                  className="text-gray-900 hover:text-gray-900/75 dark:text-gray-300 dark:hover:text-gray-300/75"
                  href="https://github.com/nesaku/SpotifyInfo"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          {/* 
          <p className="mx-auto max-w-lg text-xs text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
            natus tempore illo laborum nam, modi quam sequi amet quo quasi
            impedit iure eum similique pariatur alias exercitationem, porro
            perspiciatis esse. Corporis odit consequatur sint sequi.
            <span className="mt-4 block"> &copy; 2022 SpotifyInfo </span>
          </p>
          */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
