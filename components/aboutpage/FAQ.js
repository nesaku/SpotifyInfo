import Link from "next/link";
import React from "react";

const FAQ = () => {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h2 className="mt-20 text-3xl text-center font-bold sm:text-4xl">FAQ</h2>
      <div className="flex justify-center mt-10">
        <div
          id="faq"
          className="max-w-4xl w-11/12 bg-white/30 dark:bg-transparent/20 rounded-2xl border-2 border-gray-400 dark:border-4 dark:border-gray-400"
        >
          <details
            className="group p-6 border-t-0 border-gray-400 dark:border-gray-400"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between">
              <h2 className="font-semibold capitalize">How Does I Use This?</h2>

              <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-100 group-open:opacity-0"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-0 group-open:opacity-100"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 mx-8 leading-relaxed text-gray-800 dark:text-gray-200">
              <span className="underline">
                There are two ways you can use SpotifyInfo:
              </span>
              <br />
              1. Visit{" "}
              <a
                className="underline text-green-600 dark:text-green-500/80"
                href="https://spotifyinfo.netlify.app"
                target="_blank"
                rel="noreferrer"
              >
                spotifyinfo.netlify.app
              </a>{" "}
              and paste the Spotify track URL/URI into the input box.
              <br />
              <b>OR</b>
              <br />
              2. Replace{" "}
              <a
                className="underline text-green-600 dark:text-green-500/80"
                href="https://open.spotify.com"
                target="_blank"
                rel="noreferrer"
              >
                https://open.spotify.com
              </a>{" "}
              of any Spotify track page URL with spotifyinfo.netlify.app. Then
              click the{" "}
              <code>
                <span className="bg-gray-300 dark:bg-slate-900 px-2 py-1 rounded-lg">
                  Fetch Data
                </span>
              </code>{" "}
              button.
              <br />
            </p>
          </details>
          <details className="group p-6 border-t-2 border-gray-400 dark:border-gray-400">
            <summary className="flex cursor-pointer items-center justify-between">
              <h2 className="font-semibold capitalize">How Does This Work?</h2>

              <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-100 group-open:opacity-0"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-0 group-open:opacity-100"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 mx-8 leading-relaxed text-gray-800 dark:text-gray-200">
              Short Answer - Scraping And The Spotify Web API. <br />
              SpotifyInfo goes to the Spotify track page and scrapes the
              required content or uses the Spotify Web API to get the required
              data.
            </p>
          </details>
          <details className="group p-6 border-t-2 border-gray-400 dark:border-gray-400">
            <summary className="flex cursor-pointer items-center justify-between">
              <h2 className="font-semibold capitalize">
                Why Is This Slower Than Spotify?
              </h2>

              <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-100 group-open:opacity-0"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-0 group-open:opacity-100"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 mx-8 leading-relaxed text-gray-800 dark:text-gray-200">
              When you make a request for a Spotify track on SpotifyInfo, your
              request needs to be first scraped by the scraper from Spotify
              before the result can be shown to you. This causes a delay from
              when you make the request to when the result is shown.
            </p>
          </details>
          <details className="group p-6 border-t-2 border-gray-400 dark:border-gray-400">
            <summary className="flex cursor-pointer items-center justify-between">
              <h2 className="font-semibold capitalize">
                What Do You Do With My Data?
              </h2>

              <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-100 group-open:opacity-0"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-0 group-open:opacity-100"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 mx-8 leading-relaxed text-gray-800 dark:text-gray-200">
              Nothing. Since we don&apos;t collect any user data we can&apos;t
              use it, you can check out our{" "}
              <Link
                className="text-blue-600 dark:text-blue-500 underline"
                href="/privacy"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </Link>{" "}
              for more info. If you still don&apos;t trust us, feel free to take
              a look at our{" "}
              <a
                className="text-blue-600 dark:text-blue-500 underline"
                href="https://github.com/nesaku/SpotifyInfo/issues"
                target="_blank"
                rel="noreferrer"
              >
                source code
              </a>
              .
            </p>
          </details>
          <details className="group p-6 border-t-2 border-gray-400 dark:border-gray-400">
            <summary className="flex cursor-pointer items-center justify-between">
              <h2 className="font-semibold capitalize">
                Why Is This Missing Functionality?
              </h2>

              <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-100 group-open:opacity-0"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-0 group-open:opacity-100"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 mx-8 leading-relaxed text-gray-800 dark:text-gray-200">
              SpotifyInfo, is still a work in progress and new functionality is
              continually being developed. If you have a certain feature that
              you would like to see, feel free to open an issue on{" "}
              <a
                className="text-blue-600 dark:text-blue-500 underline"
                href="https://github.com/nesaku/SpotifyInfo/issues"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>{" "}
              or use the{" "}
              <Link
                className="text-blue-600 dark:text-blue-500 underline"
                href="/contact"
              >
                contact form
              </Link>
              .
            </p>
          </details>
          <details className="group p-6 border-t-2 border-gray-400 dark:border-gray-400">
            <summary className="flex cursor-pointer items-center justify-between">
              <h2 className="font-semibold capitalize">Got Some Feedback?</h2>

              <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-100 group-open:opacity-0"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-0 group-open:opacity-100"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 mx-8 leading-relaxed text-gray-800 dark:text-gray-200">
              We would love to here what you have to say about SpotifyInfo.
              Wether it be a bug report, a feature request, or criticism, we
              want to hear it. Please feel free to open an issue on{" "}
              <a
                className="text-blue-600 dark:text-blue-500 underline"
                href="https://github.com/nesaku/SpotifyInfo/issues"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>{" "}
              or use the{" "}
              <Link
                className="text-blue-600 dark:text-blue-500 underline"
                href="/contact"
              >
                contact form
              </Link>
              .
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
