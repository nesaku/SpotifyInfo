import Link from "next/link";
import React from "react";

const NotSupported = () => {
  return (
    <div className="flex items-center justify-center w-full m-auto h-screen">
      <div className="shadow-lg rounded-2xl p-4 backdrop-blur-lg bg-white/40 dark:bg-gray-800 max-w-lg">
        <h1 className="dark:text-gray-100 text-gray-900 text-2xl capitalize font-semibold text-center">
          <code>This route is not supported. Please use a track URL/URI.</code>
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
  );
};

export default NotSupported;
