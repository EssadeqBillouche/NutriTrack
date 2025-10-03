import pool from '../src/config/db.js';
// # Seed all test data
// npm run seed-athlete
// npm run seed-chronic
// npm run seed-dashboard
async function setupDashboardTables() {
  try {
    console.log('🔧 Setting up dashboard data tables...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.daily_nutrition_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES public.users(id),
        log_date DATE NOT NULL DEFAULT CURRENT_DATE,
        calories_consumed INTEGER DEFAULT 0,
        protein_g DECIMAL(5,2) DEFAULT 0,
        carbs_g DECIMAL(5,2) DEFAULT 0,
        fats_g DECIMAL(5,2) DEFAULT 0,
        water_intake_l DECIMAL(4,2) DEFAULT 0,
        sodium_mg INTEGER DEFAULT 0,
        sugar_g DECIMAL(5,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, log_date)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.meal_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES public.users(id),
        meal_type VARCHAR(20) NOT NULL, -- breakfast, lunch, dinner, snack
        meal_name VARCHAR(255) NOT NULL,
        calories INTEGER NOT NULL,
        protein_g DECIMAL(5,2) DEFAULT 0,
        carbs_g DECIMAL(5,2) DEFAULT 0,
        fats_g DECIMAL(5,2) DEFAULT 0,
        sodium_mg INTEGER DEFAULT 0,
        sugar_g DECIMAL(5,2) DEFAULT 0,
        image_url VARCHAR(500),
        logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        log_date DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.health_metrics (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES public.users(id),
        metric_type VARCHAR(50) NOT NULL, -- blood_sugar, blood_pressure, weight, etc.
        metric_value DECIMAL(8,2) NOT NULL,
        metric_unit VARCHAR(20) NOT NULL,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        log_date DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.training_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES public.users(id),
        session_type VARCHAR(50) NOT NULL, -- cardio, strength, recovery, etc.
        duration_minutes INTEGER NOT NULL,
        intensity VARCHAR(20) NOT NULL, -- low, moderate, high
        calories_burned INTEGER DEFAULT 0,
        notes TEXT,
        session_date DATE NOT NULL DEFAULT CURRENT_DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.medication_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES public.users(id),
        medication_name VARCHAR(255) NOT NULL,
        dosage VARCHAR(100) NOT NULL,
        frequency VARCHAR(50) NOT NULL, -- daily, twice_daily, etc.
        taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        log_date DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `);

    console.log(' Dashboard tables created successfully!');

  } catch (error) {
    console.error(' Error setting up dashboard tables:', error.message);
  } finally {
    await pool.end();
  }
}

setupDashboardTables();
