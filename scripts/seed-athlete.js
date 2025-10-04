import pool from '../src/config/db.js';
// # Seed all test data
// npm run seed-athlete
// npm run seed-chronic
// npm run seed-dashboard

async function seedAthleteData() {
  try {
    console.log('🏃‍♂️ Seeding athlete user data...');
    
    // Create athlete user
    const userResult = await pool.query('SELECT id FROM public.users WHERE email = $1', ['athlete@example.com']);
    
    let userId;
    if (userResult.rows.length === 0) {
      console.log('Creating athlete user...');
      const newUser = await pool.query(`
        INSERT INTO public.users (first_name, last_name, email, password_hash, date_of_birth, gender)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `, [
        'Alex', 
        'Johnson', 
        'athlete@example.com', 
        'hashed_password', 
        '1992-05-15', 
        'male'
      ]);
      userId = newUser.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
      console.log('Athlete user already exists, using existing ID:', userId);
    }
    
    // Create athlete profile
    const profileResult = await pool.query('SELECT id FROM public.user_profiles WHERE user_id = $1', [userId]);
    
    if (profileResult.rows.length === 0) {
      console.log('Creating athlete profile...');
      await pool.query(`
        INSERT INTO public.user_profiles (
          user_id, profile_type, height_cm, current_weight_kg, target_weight_kg,
          activity_level, has_diabetes, has_hypertension, has_obesity,
          athlete_discipline, training_frequency
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        userId,
        'athlete', // profile_type
        180, // height_cm
        75, // current_weight_kg
        78, // target_weight_kg (gaining muscle)
        'very_active', // activity_level
        false, // has_diabetes
        false, // has_hypertension
        false, // has_obesity
        'running', // athlete_discipline
        '5_times_week' // training_frequency
      ]);
      
      console.log(' Athlete profile created successfully!');
      console.log('👤 User ID:', userId);
      console.log('🏃‍♂️ Profile: Running athlete, 5x/week training');
    } else {
      console.log(' Athlete profile already exists for user', userId);
    }
    
  } catch (error) {
    console.error(' Error seeding athlete data:', error.message);
  } finally {
    await pool.end();
  }
}

seedAthleteData();
