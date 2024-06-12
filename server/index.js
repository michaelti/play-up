import express from "express";
import gameRoutes from "./routes/gameRoutes.js";
import cors from "cors";

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("./images"));

app.use("/games", gameRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
