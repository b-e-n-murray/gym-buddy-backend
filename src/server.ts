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
app.get("/exercises/:targetMuscles/:difficulty/:goal/:equips", async (req, res) => {
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
    const goal = req.params.goal
    const equips = req.params.equips.split(",")
    const limit = determineLimit(targetMuscles, difficulty)
    const separatedStrings = targetMuscles.split(",");
    console.log(separatedStrings, difficulty, goal, equips, limit);
    let relevantExercises
    if (goal === 'Varied') {
      relevantExercises = await client.query(
      `SELECT * FROM exercise_data
      WHERE (targets @> $1::VARCHAR[] OR targets && $1::VARCHAR[])
      AND requirements = ANY($2::VARCHAR[])
      LIMIT $3;`,
      [separatedStrings, equips, limit]
    );
  } else {
      relevantExercises = await client.query(
      `SELECT * FROM exercise_data
      WHERE (targets @> $1::VARCHAR[] OR targets && $1::VARCHAR[])
      AND (NOT specialty != $2 OR specialty = $2)
      AND requirements = ANY($3::VARCHAR[])
      LIMIT $4;`,
      [separatedStrings, goal, equips, limit]
    );
  }
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
