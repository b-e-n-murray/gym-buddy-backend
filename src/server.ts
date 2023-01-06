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
app.get("/:targetMuscles", async (req, res) => {
  try {
    const targetMuscles = req.params.targetMuscles;
    const separatedStrings = targetMuscles.split(",");
    console.log("retrieving exercises targeting: ", separatedStrings);
    const relevantExercises = await client.query(
      "SELECT * FROM exercise_data WHERE targets @> $1::VARCHAR[] OR targets && $1::VARCHAR[] LIMIT 5;",
      //select all rows where the targets column contains at least one of the elements in the given array.
      [separatedStrings]
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
