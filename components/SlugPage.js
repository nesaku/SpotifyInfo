import Link from "next/link";
import Loader from "@/components/Loader";

export default function SlugPage({ type, isLoading, error, children }) {
  if (error)
    return (
      <div className="flex flex-col justify-center max-w-2xl text-center mx-auto h-[74vh]">
        <h1 className="text-red-600 font-bold text-5xl uppercase">
          Error - {type} Not Found
        </h1>
        <h2 className="my-12 text-lg font-bold text-black dark:text-gray-100">
          An Example Of A Valid Query Is:
          <p className="font-normal">
            https://open.spotify.com/{type}/3CRDbSIZ4r5MsZ0YwxuEkn
          </p>
        </h2>
        <div className="mx-auto font-semibold text-gray-900 dark:text-white bg-green-500 ring ring-green-600 ring-offset-2 ring-offset-green-100 py-5 px-2 rounded-xl shadow-lg shadow-green-500 hover:shadow-xl hover:bg-green-600 transition duration-300">
          <Link href="/">Go Back Home</Link>
        </div>
      </div>
    );

  if (isLoading) return <Loader />;

  return children;
}
