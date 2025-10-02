import pool from '../src/config/db.js';

async function testProfileData() {
  try {
    console.log('Testing profile data retrieval...');
    
    // Test the getUserWithProfile function
    const query = `
      SELECT 
        u.id, u.first_name, u.last_name, u.email, u.date_of_birth, u.gender,
        up.profile_type, up.height_cm, up.current_weight_kg, up.target_weight_kg,
        up.activity_level, up.has_diabetes, up.has_hypertension, up.has_obesity,
        up.athlete_discipline, up.training_frequency
      FROM public.users u
      LEFT JOIN public.user_profiles up ON u.id = up.user_id
      WHERE u.id = 1
    `;
    
    const result = await pool.query(query, [1]);
    const userData = result.rows[0];
    
    if (userData) {
      console.log('✅ User data found:');
      console.log('Name:', userData.first_name, userData.last_name);
      console.log('Email:', userData.email);
      console.log('Profile Type:', userData.profile_type);
      console.log('Height:', userData.height_cm, 'cm');
      console.log('Weight:', userData.current_weight_kg, 'kg');
      console.log('Target Weight:', userData.target_weight_kg, 'kg');
      console.log('Activity Level:', userData.activity_level);
      console.log('Health Conditions:');
      console.log('- Diabetes:', userData.has_diabetes);
      console.log('- Hypertension:', userData.has_hypertension);
      console.log('- Obesity:', userData.has_obesity);
      
      // Calculate BMI
      if (userData.current_weight_kg && userData.height_cm) {
        const heightInMeters = userData.height_cm / 100;
        const bmi = (userData.current_weight_kg / (heightInMeters * heightInMeters)).toFixed(1);
        console.log('BMI:', bmi);
      }
    } else {
      console.log('❌ No user data found for ID 1');
      
      // Check if there are any users in the database
      const userCount = await pool.query('SELECT COUNT(*) FROM public.users');
      console.log('Total users in database:', userCount.rows[0].count);
      
      // Check if there are any profiles
      const profileCount = await pool.query('SELECT COUNT(*) FROM public.user_profiles');
      console.log('Total profiles in database:', profileCount.rows[0].count);
    }
    
  } catch (error) {
    console.error('❌ Error testing profile data:', error.message);
  } finally {
    await pool.end();
  }
}

testProfileData();
