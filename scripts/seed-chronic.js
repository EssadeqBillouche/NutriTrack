import pool from '../src/config/db.js';
// # Seed all test data
// npm run seed-athlete
// npm run seed-chronic
// npm run seed-dashboard
async function seedChronicData() {
  try {
    console.log('🏥 Seeding chronic patient user data...');
    
    const userResult = await pool.query('SELECT id FROM public.users WHERE email = $1', ['patient@example.com']);
    
    let userId;
    if (userResult.rows.length === 0) {
      console.log('Creating chronic patient user...');
      const newUser = await pool.query(`
        INSERT INTO public.users (first_name, last_name, email, password_hash, date_of_birth, gender)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `, [
        'Marie', 
        'Dubois', 
        'patient@example.com', 
        'hashed_password', 
        '1965-08-22', 
        'female'
      ]);
      userId = newUser.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
      console.log('Chronic patient user already exists, using existing ID:', userId);
    }
    
    const profileResult = await pool.query('SELECT id FROM public.user_profiles WHERE user_id = $1', [userId]);
    
    if (profileResult.rows.length === 0) {
      console.log('Creating chronic patient profile...');
      await pool.query(`
        INSERT INTO public.user_profiles (
          user_id, profile_type, height_cm, current_weight_kg, target_weight_kg,
          activity_level, has_diabetes, has_hypertension, has_obesity,
          athlete_discipline, training_frequency
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        userId,
        'weight_loss', // profile_type
        165, // height_cm
        85, // current_weight_kg
        70, // target_weight_kg (losing weight)
        'lightly_active', // activity_level
        true, // has_diabetes
        true, // has_hypertension
        true, // has_obesity
        null, // athlete_discipline
        null // training_frequency
      ]);
      
      console.log(' Chronic patient profile created successfully!');
      console.log('👤 User ID:', userId);
      console.log('🏥 Profile: Diabetes + Hypertension + Obesity');
    } else {
      console.log(' Chronic patient profile already exists for user', userId);
    }
    
  } catch (error) {
    console.error(' Error seeding chronic patient data:', error.message);
  } finally {
    await pool.end();
  }
}

seedChronicData();
