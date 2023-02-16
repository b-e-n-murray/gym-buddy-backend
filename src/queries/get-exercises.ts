export const singleExerciseQuery = `SELECT 
      e.exercise_name, e.difficulty, e.requirements, e.specialty, m.muscle_name AS targeted_muscle
    FROM 
      exercise_data e
    JOIN 
      exercise_muscles em ON e.id = em.exercise_id
    JOIN 
      muscles m ON em.muscle_id = m.id
    WHERE 
    m.muscle_name = $1`;

export const twoExerciseQuery = `SELECT 
      e.exercise_name, e.difficulty, e.requirements, e.specialty, m.muscle_name AS targeted_muscle
    FROM 
      exercise_data e
    JOIN 
      exercise_muscles em ON e.id = em.exercise_id
    JOIN 
      muscles m ON em.muscle_id = m.id
    WHERE 
    (m.muscle_name = $1 OR m.muscle_name = $2)`;

export const threeExerciseQuery = `SELECT 
      e.exercise_name, e.difficulty, e.requirements, e.specialty, m.muscle_name AS targeted_muscle
    FROM 
      exercise_data e
    JOIN 
      exercise_muscles em ON e.id = em.exercise_id
    JOIN 
      muscles m ON em.muscle_id = m.id
    WHERE 
    (m.muscle_name = $1 OR m.muscle_name = $2 OR m.muscle_name = $3)`;
