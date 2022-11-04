import React from "react";
import Meta from "../components/Meta";
import FormQuery from "../components/FormQuery";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-green-50 to-green-100 dark:bg-gradienthero min-h-screen flex flex-col">
      <Meta />
      <Header />
      {/* HomePage (Form Query Page) */}
      <FormQuery />
    </div>
  );
};

export default Home;
