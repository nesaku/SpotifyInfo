import Link from "next/link";
import React from "react";

const success = () => {
  return (
    <div className="flex items-center justify-center w-full m-auto h-screen">
      <div className="shadow-lg rounded-2xl p-4 backdrop-blur-lg bg-white/40 dark:bg-gray-800">
        <div className="w-full h-full text-center">
          <div className="flex h-full flex-col justify-between">
            <svg
              className="h-12 w-12 mt-4 m-auto text-green-500"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <h1 className="text-gray-700 dark:text-gray-100 text-lg mt-4 py-2 px-6">
              Your Response Was Sent. Thank you.
            </h1>
            <div className="flex items-center justify-center gap-4 w-full mt-8">
              <Link
                href="/"
                className="py-4 px-6  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-100 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default success;
