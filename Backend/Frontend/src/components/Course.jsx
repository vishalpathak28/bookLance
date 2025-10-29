import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("/book");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white dark:bg-slate-900 min-h-screen">
        <div className="mt-10 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            You've just unlocked awesome —{" "}
            <span className="text-pink-500">welcome!</span>
          </h1>
          <p className="mt-12">
            Dive into a world of books where learning never stops. Whether
            you're preparing for exams, brushing up on skills, or exploring new
            topics, Bookstore is your trusted digital companion.
          </p>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
            {book.map((item) => (
              <Cards
                key={item.id}
                item={item}
                onPaymentSuccess={() => setShowMessage(true)} // ✅ identical trigger
              />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ EXACT same popup as Freebook.jsx */}
      {showMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-900 text-black dark:text-white p-8 rounded-2xl shadow-2xl text-center w-[90%] md:w-[500px] border border-pink-400">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">
              ✅ Payment Successful!
            </h2>
            <p className="text-lg mb-3 font-medium">Next Step:</p>
            <p className="text-lg mb-4">
              Please send your <b>payment screenshot</b> and <b>address</b> on
              WhatsApp number:
            </p>

            <p className="text-2xl font-semibold text-green-600 mb-6">
              8630198478
            </p>

            {/* ✅ WhatsApp Button */}
            <a
              href="https://wa.me/918630198478?text=Hello%20I%20have%20completed%20my%20payment%20and%20want%20to%20share%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg duration-200"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="WhatsApp"
                className="w-6 h-6"
              />
              Chat on WhatsApp
            </a>

            <button
              onClick={() => setShowMessage(false)}
              className="mt-6 block w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Course;
