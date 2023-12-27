import React from "react";

const ContactForm = () => {
  return (
    <section>
      <div className="px-4 py-8 mb-20 mx-auto max-w-screen-sm text-center backdrop-blur rounded-2xl">
        <form
          action="https://submit-form.com/0UBRVHRX"
          method="POST"
          className="space-y-8"
        >
          <div className="hidden">
            <input
              type="hidden"
              name="_redirect"
              value={`${process.env.NEXT_PUBLIC_HOST_URL}/success`}
            />
            <input
              type="hidden"
              name="_error"
              value={`${process.env.NEXT_PUBLIC_HOST_URL}/success`}
            />
            <input type="hidden" name="_append" value="false" />
          </div>
          <div>
            <label
              name="email"
              className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-center text-md rounded-lg focus:ring-green-500 focus:ring-2 focus:focus:outline-none block w-full p-2.5 dark:backdrop-blur-sm dark:bg-white/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 darkdark:shadow-sm-light"
              required
            />
          </div>
          <div>
            <label
              name="subject"
              className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              className="block p-3 w-full text-md text-gray-900 text-center bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:ring-2 focus:focus:outline-none dark:backdrop-blur-sm dark:bg-white/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 darkdark:shadow-sm-light"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              name="message"
              className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-gray-300"
            >
              Your message
            </label>
            <textarea
              name="message"
              rows="6"
              className="block p-2.5 w-full text-md text-gray-900 text-center bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-green-500 focus:ring-2 focus:focus:outline-none dark:backdrop-blur-sm dark:bg-white/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="font-semibold text-md text-white bg-green-500 ring ring-green-600 ring-offset-2 ring-offset-green-100 py-4 px-5 rounded-2xl shadow-lg shadow-green-500 hover:shadow-xl hover:bg-green-600 transition duration-300 delay-40 hover:delay-40"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
