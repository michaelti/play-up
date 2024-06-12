import express from "express";
import gameRoutes from "./routes/gameRoutes.js";

const PORT = 8000;

const app = express();

app.use("/games", gameRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
