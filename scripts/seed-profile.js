import pool from '../src/config/db.js';
// # Seed all test data
// npm run seed-athlete
// npm run seed-chronic
// npm run seed-dashboard
async function seedProfileData() {
  try {
    console.log('Seeding profile data...');
    
    const userResult = await pool.query('SELECT id FROM public.users WHERE id = 1');
    
    if (userResult.rows.length === 0) {
      console.log('Creating test user...');
      await pool.query(`
        INSERT INTO public.users (first_name, last_name, email, password_hash, date_of_birth, gender)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, ['John', 'Doe', 'john.doe@example.com', 'hashed_password', '1995-01-15', 'male']);
    }
    
    const profileResult = await pool.query('SELECT id FROM public.user_profiles WHERE user_id = 1');
    
    if (profileResult.rows.length === 0) {
      console.log('Creating test profile...');
      await pool.query(`
        INSERT INTO public.user_profiles (
          user_id, profile_type, height_cm, current_weight_kg, target_weight_kg,
          activity_level, has_diabetes, has_hypertension, has_obesity,
          athlete_discipline, training_frequency
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        1, // user_id
        'weight_loss', // profile_type
        175, // height_cm
        70, // current_weight_kg
        65, // target_weight_kg
        'moderately_active', // activity_level
        false, // has_diabetes
        false, // has_hypertension
        false, // has_obesity
        'running', // athlete_discipline
        '3-4_times_week' // training_frequency
      ]);
      
      console.log(' Test profile created successfully!');
    } else {
      console.log(' Profile already exists for user 1');
    }
    
  } catch (error) {
    console.error(' Error seeding profile data:', error.message);
  } finally {
    await pool.end();
  }
}

seedProfileData();
