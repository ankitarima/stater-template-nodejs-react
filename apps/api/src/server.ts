import express, { Response } from "express";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import config from "@config/config";
import errorHandler from "@middlewares/error.middleware";
import router from "@routes/index.routes";

// CORS configuration
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "FETCH"],
  allowedHeaders: ["Content-Type", "authorization"],
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpts));
app.use(express.json());
app.use(fileUpload());

// Static Path [serving build application inside the backend]
app.use(express.static(path.join(__dirname, "../public")));

// Registering Index router
app.use("/api/v1/", router);

// SPA fallback (Express 5 requires a named wildcard, not a bare "*")
app.get("/*splat", (_, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error Handler middleware
app.use(errorHandler);

const port = config.PORT;
app.listen(port, async () => {
  console.info(`App is started running on http://localhost:${port}`);
});
