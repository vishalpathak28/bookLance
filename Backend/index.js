import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import paymentRoute from "./route/payment.route.js";

dotenv.config(); // load env first

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Retry after 5 seconds instead of crashing
    setTimeout(connectDB, 5000);
  }
};

connectDB(); // initialize DB connection

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/payment", paymentRoute);

// Warn if Razorpay keys missing
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys missing! Check your .env file.");
}

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static(path.join(dirPath, "Frontend/dist")));
  app.get(/^\/.*$/, (req, res) => {
    res.sendFile(path.join(dirPath, "Frontend/dist/index.html"));
  });
}

// Catch unhandled promise rejections globally (prevents exit)
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
