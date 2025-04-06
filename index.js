'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = require('dotenv');
const express_1 = __importDefault(require('express'));
const mongooseClient_1 = require('./src/database/mongooseClient');
const academyRoutes_1 = __importDefault(require('./src/routes/academyRoutes'));
const userRoutes_1 = __importDefault(require('./src/routes/userRoutes'));
const main = async () => {
  (0, dotenv_1.config)();
  const app = (0, express_1.default)();
  app.use(express_1.default.json());
  app.use(express_1.default.urlencoded({ extended: true }));
  const port = process.env.PROJECT_PORT || 3000;
  await mongooseClient_1.MongooseClient.connect();
  app.use('/user', userRoutes_1.default);
  app.use('/academy', academyRoutes_1.default);
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
