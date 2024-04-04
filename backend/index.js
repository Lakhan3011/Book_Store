import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import booksRoute from "./routes/booksRoute.js";

const app = express();
// Middle ware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// app.use(cors());

// Option:2 Allow custom origin
app.use(
  cors({
    origin: "https://book-store-frontend-lakhan3011s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welocme dev!!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
