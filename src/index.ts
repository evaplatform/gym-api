import { config } from 'dotenv'
import express from "express";
import userRoutes from "./routes/userRoutes";
import academyRoutes from "./routes/academyRoutes";
import { MongooseClient } from './database/mongooseClient';


const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = process.env.PROJECT_PORT || 3000;

  await MongooseClient.connect();

  app.use('/user', userRoutes);
  app.use('/academy', academyRoutes);

  app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
};

main();

// config();

// const app = express();


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const PORT = 3000;

// app.use("/user", userRoutes);
// app.use("/academy", academyRoutes)


// mongoose.connect("mongodb://localhost:27017/repository-pattern")
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => console.error("MongoDB connection error:", err));
