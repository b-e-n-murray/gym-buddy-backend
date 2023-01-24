import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT_NUMBER = process.env.PORT ?? 4000;
const client = new Client(process.env.DATABASE_URL);
client.connect();


// GET /items/:id
app.get("/exercises/:targetMuscles/:difficulty", async (req, res) => {
  try {
    function determineLimit(targetArray: string, difficulty: string): number | undefined {
      if (difficulty === 'Easy') {
        return targetArray.length === 1 ? 2 : 3
      }
      if (difficulty === 'Intermediate') {
        return targetArray.length === 1 ? 2 : 4
      }
      if (difficulty === 'Hard') {
        return targetArray.length === 1 ? 3 : 5
      }
      else return undefined
    }
    const targetMuscles = req.params.targetMuscles;
    const difficulty = req.params.difficulty
    const limit = determineLimit(targetMuscles, difficulty)
    const separatedStrings = targetMuscles.split(",");
    console.log("retrieving exercises targeting: ", separatedStrings);
    const relevantExercises = await client.query(
      `SELECT * FROM exercise_data 
      WHERE targets @> $1::VARCHAR[] 
      OR targets && $1::VARCHAR[] 
      LIMIT $2;`,
      //select all rows where the targets column contains at least one of the elements in the given array.
      [separatedStrings, limit]
    );
    res.status(200).json(relevantExercises.rows);
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ message: "internal error" });
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
