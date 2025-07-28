import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";

import path from "path";
const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// ✅ Middleware first (important order!)
app.use(cors()); // enable CORS early
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));

// ✅ Register routes after middleware
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", contactRoutes);
app.use("/", projectRoutes);
app.use("/", qualificationRoutes);

// ✅ Error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.error(err);
  }
});

export default app;