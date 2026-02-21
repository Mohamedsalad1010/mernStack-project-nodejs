import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";
import usersRouter from "./routes/users.js";
import authUser from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import uploadRoute from "./routes/upload.js";
import tasksRoute from "./routes/tasks.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";
import { erroHanddling } from "./middlewares/globalErrorHanddling.js";
import { notFound } from "./middlewares/notFound.js";
import { limiter } from "./middlewares/ratelimit.js";

dotenv.config();
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;



app.use(helmet());
app.use(limiter);

app.use(cors(
    {
        origin: ["http://localhost:5173"]
    }
))
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//  use doc route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// using rapi/outes
app.use("/api/users", usersRouter);
app.use("/api/auth", authUser);
app.use("/api/admin", adminRouter);
app.use("/api/upload", uploadRoute);
app.use("/api/tasks", tasksRoute);

app.use("/api", (req, res) => {
  res.send("server is working...");
});

// server frontend in production

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // serve frontend app
  app.get(/.*/, (req, res) => {
  
       res.send(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  
  });
}


// use errors
// not found error
app.use(notFound);
// global error handaling
app.use(erroHanddling);
// connecting to mongoose
mongoose
  .connect(
    process.env.NODE_ENV == "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => console.log("✅connect mongobd locally"))
  .catch((err) => console.log("❌no connected mondb locally.", err.message));

// server running
app.listen(PORT, () => {
  console.log(`server is running ${PORT}.. `);
});
