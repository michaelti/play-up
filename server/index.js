import "dotenv/config";
import express from "express";
import gameRoutes from "./routes/gameRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import matchResultRoutes from "./routes/matchResultRoutes.js";
import cors from "cors";

const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("./images"));

app.use("/players", playerRoutes);
app.use("/match-results", matchResultRoutes);
app.use("/games", gameRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
