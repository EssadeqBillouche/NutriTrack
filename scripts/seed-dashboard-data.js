import pool from '../src/config/db.js';
// # Seed all test data
// npm run seed-athlete
// npm run seed-chronic
// npm run seed-dashboard
async function seedDashboardData() {
  try {
    console.log('📊 Seeding dashboard data...');

    const users = await pool.query('SELECT id, email FROM public.users ORDER BY id');
    
    for (const user of users.rows) {
      console.log(`Seeding data for user ${user.id} (${user.email})...`);
      
      const profile = await pool.query(
        'SELECT * FROM public.user_profiles WHERE user_id = $1',
        [user.id]
      );
      const profileData = profile.rows[0];
      
      for (let i = 6; i >= 0; i--) {
        const logDate = new Date();
        logDate.setDate(logDate.getDate() - i);
        const dateStr = logDate.toISOString().split('T')[0];
        
        const existing = await pool.query(
          'SELECT id FROM public.daily_nutrition_logs WHERE user_id = $1 AND log_date = $2',
          [user.id, dateStr]
        );
        
        if (existing.rows.length === 0) {
          let calories, protein, carbs, fats, water;
          
          if (profileData?.profile_type === 'athlete') {
            calories = 2800 + Math.floor(Math.random() * 400);
            protein = 120 + Math.floor(Math.random() * 60);
            carbs = 350 + Math.floor(Math.random() * 100);
            fats = 80 + Math.floor(Math.random() * 40);
            water = 3.0 + Math.random() * 1.0;
          } else if (profileData?.has_diabetes || profileData?.has_hypertension) {
            calories = 1600 + Math.floor(Math.random() * 200);
            protein = 60 + Math.floor(Math.random() * 30);
            carbs = 150 + Math.floor(Math.random() * 50);
            fats = 50 + Math.floor(Math.random() * 20);
            water = 2.0 + Math.random() * 0.5;
          } else {
            calories = 2000 + Math.floor(Math.random() * 300);
            protein = 80 + Math.floor(Math.random() * 40);
            carbs = 200 + Math.floor(Math.random() * 80);
            fats = 60 + Math.floor(Math.random() * 30);
            water = 2.5 + Math.random() * 0.5;
          }
          
          await pool.query(`
            INSERT INTO public.daily_nutrition_logs 
            (user_id, log_date, calories_consumed, protein_g, carbs_g, fats_g, water_intake_l, sodium_mg, sugar_g)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `, [
            user.id, dateStr, calories, protein, carbs, fats, water,
            Math.floor(Math.random() * 2000) + 1000, // sodium
            Math.floor(Math.random() * 50) + 20 // sugar
          ]);
        }
      }
      
      const today = new Date().toISOString().split('T')[0];
      const existingMeals = await pool.query(
        'SELECT COUNT(*) FROM public.meal_logs WHERE user_id = $1 AND log_date = $2',
        [user.id, today]
      );
      
      if (existingMeals.rows[0].count === '0') {
        const meals = [
          { type: 'breakfast', name: 'Oatmeal with fruits', calories: 320, protein: 12, carbs: 45, fats: 8 },
          { type: 'lunch', name: 'Grilled chicken salad', calories: 450, protein: 35, carbs: 20, fats: 25 },
          { type: 'dinner', name: 'Salmon with vegetables', calories: 380, protein: 28, carbs: 15, fats: 22 }
        ];
        
        for (const meal of meals) {
          await pool.query(`
            INSERT INTO public.meal_logs 
            (user_id, meal_type, meal_name, calories, protein_g, carbs_g, fats_g, sodium_mg, sugar_g)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `, [
            user.id, meal.type, meal.name, meal.calories, meal.protein, meal.carbs, meal.fats,
            Math.floor(Math.random() * 500) + 200, // sodium
            Math.floor(Math.random() * 15) + 5 // sugar
          ]);
        }
      }
      
      if (profileData?.has_diabetes || profileData?.has_hypertension) {
        const existingMetrics = await pool.query(
          'SELECT COUNT(*) FROM public.health_metrics WHERE user_id = $1 AND log_date = $2',
          [user.id, today]
        );
        
        if (existingMetrics.rows[0].count === '0') {
          if (profileData.has_diabetes) {
            await pool.query(`
              INSERT INTO public.health_metrics (user_id, metric_type, metric_value, metric_unit, log_date)
              VALUES ($1, 'blood_sugar', $2, 'mg/dL', $3)
            `, [user.id, 120 + Math.floor(Math.random() * 40), today]);
          }
          
          if (profileData.has_hypertension) {
            const systolic = 125 + Math.floor(Math.random() * 20);
            const diastolic = 80 + Math.floor(Math.random() * 15);
            
            await pool.query(`
              INSERT INTO public.health_metrics (user_id, metric_type, metric_value, metric_unit, log_date)
              VALUES ($1, 'blood_pressure_systolic', $2, 'mmHg', $3)
            `, [user.id, systolic, today]);
            
            await pool.query(`
              INSERT INTO public.health_metrics (user_id, metric_type, metric_value, metric_unit, log_date)
              VALUES ($1, 'blood_pressure_diastolic', $2, 'mmHg', $3)
            `, [user.id, diastolic, today]);
          }
        }
      }
      
      if (profileData?.profile_type === 'athlete') {
        const existingSessions = await pool.query(
          'SELECT COUNT(*) FROM public.training_sessions WHERE user_id = $1 AND session_date = $2',
          [user.id, today]
        );
        
        if (existingSessions.rows[0].count === '0') {
          const sessions = [
            { type: 'cardio', duration: 45, intensity: 'moderate', calories: 350 },
            { type: 'strength', duration: 60, intensity: 'high', calories: 400 }
          ];
          
          for (const session of sessions) {
            await pool.query(`
              INSERT INTO public.training_sessions 
              (user_id, session_type, duration_minutes, intensity, calories_burned, notes)
              VALUES ($1, $2, $3, $4, $5, $6)
            `, [
              user.id, session.type, session.duration, session.intensity, 
              session.calories, `${session.type} training session`
            ]);
          }
        }
      }
    }
    
    console.log(' Dashboard data seeded successfully!');
    
  } catch (error) {
    console.error(' Error seeding dashboard data:', error.message);
  } finally {
    await pool.end();
  }
}

seedDashboardData();
