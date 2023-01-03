import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./db";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT_NUMBER = process.env.PORT ?? 4000;
client.connect();

// GET /items/:id
app.get("/:targetMuscles", async (req, res) => {
  const targetMuscles = req.params.targetMuscles;
  const separatedStrings = targetMuscles.split(",");
  console.log("retrieving exercises targeting: ", separatedStrings);
  const relevantExercises = await client.query(
    "SELECT * FROM exercise_data WHERE targets @> $1::VARCHAR[] OR targets && $1::VARCHAR[];",
    [separatedStrings]
  );
  res.status(200).json(relevantExercises.rows);
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
