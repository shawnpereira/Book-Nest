import express from "express";
import mongoose from "mongoose";
import { PORT, mongoURL } from "./config.js";

const app = express();
app.use(express.json());
// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

import { router as rootRouter } from "./routes/bookRoute.js";
app.use("/book", rootRouter);

mongoose
  .connect(mongoURL())
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
