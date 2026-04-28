import express from "express";
import "dotenv/config";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/sounds", express.static("sounds"));
app.use("/", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});