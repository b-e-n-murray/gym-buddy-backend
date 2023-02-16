import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";
import { singleExerciseQuery } from "./queries/get-exercises";
import { twoExerciseQuery } from "./queries/get-exercises";
import { threeExerciseQuery } from "./queries/get-exercises";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT_NUMBER = process.env.PORT ?? 4000;
const client = new Client(process.env.DATABASE_URL);
client.connect();

// GET /items/:id
app.get("/exercises/:targetMuscles", async (req, res) => {
  try {
    const targetMuscles = req.params.targetMuscles.split(",");
    console.log(targetMuscles);
    if (targetMuscles.length === 1) {
      const relevantExercises = await client.query(singleExerciseQuery, [
        targetMuscles[0],
      ]);
      res.status(200).json(relevantExercises.rows);
    }
    if (targetMuscles.length === 2) {
      const relevantExercises = await client.query(twoExerciseQuery, [
        targetMuscles[0],
        targetMuscles[1],
      ]);
      res.status(200).json(relevantExercises.rows);
    }
    if (targetMuscles.length === 3) {
      const relevantExercises = await client.query(threeExerciseQuery, [
        targetMuscles[0],
        targetMuscles[1],
        targetMuscles[2],
      ]);
      res.status(200).json(relevantExercises.rows);
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "internal error" });
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
