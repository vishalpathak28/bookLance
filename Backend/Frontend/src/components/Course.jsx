import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [paymentDone, setPaymentDone] = useState(false);

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

  const handlePaymentSuccess = () => {
    console.log("Payment success triggered ✅");
    setPaymentDone(true);
  };

  const handleClose = () => {
    setPaymentDone(false);
  };

  return (
    <div className="pt-20 max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white dark:bg-slate-900 min-h-screen">
      {!paymentDone ? (
        <>
          <div className="mt-10 items-center justify-center text-center">
            <h1 className="text-2xl md:text-4xl">
              You've just unlocked awesome —{" "}
              <span className="text-pink-500">welcome!</span>
            </h1>
            <p className="mt-12">
              Dive into a world of books where learning never stops. Whether
              you're preparing for exams, brushing up on skills, or exploring
              new topics, Bookstore is your trusted digital companion.
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
                  onPaymentSuccess={handlePaymentSuccess}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        // ✅ Exact same success box with blur, bold text, close button
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl border border-pink-500 text-center max-w-sm mx-auto animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold text-pink-500 mb-3">
              ✅ Payment Successful!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
              Next Step:
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Please send your payment screenshot and address on WhatsApp:
            </p>
            <p className="text-green-600 font-bold text-lg mb-5">
              8630198478
            </p>

            <a
              href="https://wa.me/918630198478"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 text-white px-6 py-2.5 rounded-full hover:bg-green-600 transition duration-300"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-5 h-5 mr-2"
              />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;
