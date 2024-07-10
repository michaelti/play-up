import "dotenv/config";
import express from "express";
import gameRoutes from "./routes/gameRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import cors from "cors";

const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("./images"));

app.use("/players", playerRoutes);
app.use("/matches", matchRoutes);
app.use("/games", gameRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}

export default app;
