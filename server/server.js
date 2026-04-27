import express from "express";
import "dotenv/config";
// import soundsRoutes from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use("/sounds", express.static("sounds"));
// app.use("/api/sounds", soundsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});