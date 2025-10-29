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
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-900 z-50 text-center p-6">
          <h2 className="text-3xl font-semibold text-pink-500 mb-6">
            ✅ Payment Successful!
          </h2>
          <p className="text-lg mb-6">
            Next Step: Please send your payment screenshot and address on
            WhatsApp number - <strong>8630198478</strong>
          </p>
          <a
            href="https://wa.me/918630198478"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-6 h-6 mr-2"
            />
            Chat on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

export default Course;
