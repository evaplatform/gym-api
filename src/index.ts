// src/app.ts
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import academyRoutes from "./routes/academyRoutes";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use("/user", userRoutes);
app.use("/academy", academyRoutes)


mongoose.connect("mongodb://localhost:27017/repository-pattern")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
