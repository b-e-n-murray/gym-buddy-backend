create table exercise_data (
  id SERIAL PRIMARY KEY,
  exercise_name VARCHAR(250) NOT NULL,
  difficulty TEXT CHECK(difficulty = 'Easy' OR difficulty = 'Intermediate' OR difficulty = 'Hard'),
  requirements TEXT CHECK(requirements = 'None' OR requirements = 'Machine' OR requirements = 'Free-weights'),
  specialty TEXT CHECK(specialty = 'Muscle-building' OR specialty = 'Varied' OR specialty = 'Strength'))
  
INSERT INTO exercise_data VALUES
(DEFAULT,
 'Lat-Pulldown',
 'Intermediate',
 'Machine',
 'Muscle-building'),

(DEFAULT,
  'Barbell Bench Press',
'Intermediate',
'Free-weights',
'Strength'),

(DEFAULT,
'Sit-up',
'Easy',
'None',
'Varied'),

(DEFAULT,
'Barbell Squat',
'Intermediate',
'Free-weights',
'Varied'),

(DEFAULT,
'Skullcrushers',
'Hard',
'Free-weights',
'Muscle-building'),

(DEFAULT,
'EZ Bar Curl',
'Easy',
'Free-weights',
'Muscle-building'),

(DEFAULT,
'Nordic Hamstring Curls',
'Hard',
'None',
'Varied'),

(DEFAULT,
'Calf Raises',
'Easy',
'None',
'Muscle-building');

(DEFAULT,
'Dumbbell Fly',
'Intermediate',
'Free-weights',
'Muscle-building'),

(DEFAULT,
'Deadlift',
'Hard',
'Free-weights',
'Strength'),

(DEFAULT,
'Cable Rope Tricep Extension',
'Intermediate',
'Machine',
'Muscle-building'),

(DEFAULT,
'Russian Twist',
'Intermediate',
'None',
'Muscle-building'),

(DEFAULT,
'Plank',
'Easy',
'None',
'Muscle-building'),

(DEFAULT,
'Lunge',
'Easy',
'None',
'Varied'),

(DEFAULT,
'Pull-up',
'Intermediate',
'None',
'Strength');

CREATE TABLE muscles (
  id SERIAL PRIMARY KEY,
  muscle_name VARCHAR(50));
  
INSERT INTO muscles (muscle_name)
VALUES(
  'Chest'),
  ('Back'),
  ('Biceps'),
  ('Triceps'),
  ('Shoulders'),
  ('Glutes'),
  ('Core'),
  ('Hamstrings'),
  ('Quads'),
  ('Calves');
  
  CREATE TABLE exercise_muscles (
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    muscle_id INT,
    FOREIGN KEY (exercise_id) REFERENCES exercise_data(id),
    FOREIGN KEY (muscle_id) REFERENCES muscles(id));

    CREATE TABLE saved_workouts (
  id SERIAL PRIMARY KEY,
  workout_name VARCHAR(255) NOT NULL,
  date TIMESTAMP);
  
CREATE TABLE workout_exercises (
  id SERIAL PRIMARY KEY,
  workout_id INT,
  exercise_id INT,
  FOREIGN KEY (workout_id) REFERENCES saved_workouts(id),
  FOREIGN KEY (exercise_id) REFERENCES exercise_data(id));
  
  INSERT INTO exercise_muscles (exercise_id, muscle_id)
  VALUES
  (1, 2), (2, 1), (2, 4), (3, 7), (4, 6), (4, 8), (4, 9), (5, 4), (6, 3),
  (7, 8), (8, 10), (9, 1), (10, 2), (10, 8), (10, 7), (11, 4), (12, 7),
  (13, 7), (14, 6), (14, 9), (15, 2), (16, 7), (17, 10), (18, 1), (18, 4),
  (19, 2), (20, 6), (21, 2), (22, 1), (23, 5), (24, 6), (24, 9), (25, 4);