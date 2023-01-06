create table exercise_data (
  id SERIAL PRIMARY KEY,
  exercise_name VARCHAR(250) NOT NULL,
  targets VARCHAR(255) ARRAY[1],
  difficulty TEXT CHECK(difficulty = 'Easy' OR difficulty = 'Intermediate' OR difficulty = 'Hard'),
  image_url VARCHAR(1000),
  requirements TEXT CHECK(requirements = 'None' OR requirements = 'Machine' OR requirements = 'Free-weights'),
  specialty TEXT CHECK(specialty = 'Muscle-building' OR specialty = 'Varied' OR specialty = 'Strength'))
  
INSERT INTO exercise_data VALUES
(DEFAULT,
 'Lat-Pulldown',
 ARRAY['Back'],
 'Intermediate',
 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fkinxlearning.com%2Fpages%2Flat-pull-down&psig=AOvVaw2Vl8fz4OCQPLM2IpW_kkKP&ust=1671904727520000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIi478yokPwCFQAAAAAdAAAAABAG',
 'Machine',
 'Muscle-building')
 --need to change link adress to image address--
 
 INSERT INTO exercise_data VALUES
(DEFAULT,
'Barbell Bench Press',
ARRAY['Chest', 'Triceps'],
'Intermediate',
'https://www.inspireusafoundation.org/wp-content/uploads/2022/06/barbell-bench-press-benefits-1024x576.jpg',
'Free-weights',
'Strength')

 INSERT INTO exercise_data VALUES
(DEFAULT,
'Sit-up',
ARRAY['Core'],
'Easy',
'https://cdn.shopify.com/s/files/1/1075/8446/files/exercise-18.jpg?0',
'None',
'Varied'),

(DEFAULT,
'Barbell Squat',
ARRAY['Quads', 'Hamstrings', 'Glutes'],
'Intermediate',
'https://www.inspireusafoundation.org/wp-content/uploads/2022/06/the-barbell-squat.jpg',
'Free-weights',
'Varied'),

(DEFAULT,
'Skullcrushers',
ARRAY['Triceps'],
'Hard',
'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/03511101-Dumbbell-Lying-Triceps-Extension_Upper-Arms_small.jpg',
'Free-weights',
'Muscle-building');

INSERT INTO exercise_data VALUES
(DEFAULT,
'EZ Bar Curl',
ARRAY['Biceps'],
'Easy',
'https://image.shutterstock.com/image-illustration/ez-bar-curls-3d-illustration-260nw-419477218.jpg',
'Free-weights',
'Muscle-building'),

(DEFAULT,
'Nordic Hamstring Curls',
ARRAY['Hamstrings'],
'Hard',
'https://www.leeboyce.com/wp-content/uploads/2021/08/spotlighthinge.jpg',
'None',
'Varied'),

(DEFAULT,
'Calf Raises',
 ARRAY['Calves'],
'Easy',
'https://cdn.shopify.com/s/files/1/1075/8446/files/exercise-1.jpg?0',
'None',
'Muscle-building');


SELECT *
FROM exercise_data
WHERE 'Triceps' = ANY(targets);

SELECT *
FROM exercise_data
WHERE targets @> ARRAY['Chest', 'Triceps']::VARCHAR[];

SELECT * FROM exercise_data WHERE [Chest, Triceps] = ANY(targets) -- 

SELECT * FROM exercise_data
WHERE targets @> ARRAY['Chest', 'Triceps']::VARCHAR[]
OR targets && ARRAY['Chest', 'Triceps']::VARCHAR[];