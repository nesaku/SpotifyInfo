import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="mt-10">
        <h1 className="animate-pulse text-lg font-md text-gray-900 dark:text-gray-100">
          Loading Your Content...
        </h1>
      </div>
    </div>
  );
};

export default Loader;
