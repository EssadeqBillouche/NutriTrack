import pool from '../config/db.js';

export const getTodayNutrition = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT * FROM public.daily_nutrition_logs 
    WHERE user_id = $1 AND log_date = $2
  `;
  const result = await pool.query(query, [userId, today]);
  return result.rows[0];
};

export const getWeeklyNutrition = async (userId) => {
  const query = `
    SELECT * FROM public.daily_nutrition_logs 
    WHERE user_id = $1 AND log_date >= CURRENT_DATE - INTERVAL '7 days'
    ORDER BY log_date DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const getTodayMeals = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT * FROM public.meal_logs 
    WHERE user_id = $1 AND log_date = $2
    ORDER BY logged_at ASC
  `;
  const result = await pool.query(query, [userId, today]);
  return result.rows;
};

export const getRecentMeals = async (userId, limit = 5) => {
  const query = `
    SELECT * FROM public.meal_logs 
    WHERE user_id = $1 
    ORDER BY logged_at DESC 
    LIMIT $2
  `;
  const result = await pool.query(query, [userId, limit]);
  return result.rows;
};

export const getTodayHealthMetrics = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT metric_type, metric_value, metric_unit 
    FROM public.health_metrics 
    WHERE user_id = $1 AND log_date = $2
  `;
  const result = await pool.query(query, [userId, today]);
  return result.rows;
};

export const getRecentHealthMetrics = async (userId, metricType, days = 7) => {
  const query = `
    SELECT metric_value, log_date 
    FROM public.health_metrics 
    WHERE user_id = $1 AND metric_type = $2 
    AND log_date >= CURRENT_DATE - INTERVAL '${days} days'
    ORDER BY log_date DESC
  `;
  const result = await pool.query(query, [userId, metricType]);
  return result.rows;
};

export const getTodayTrainingSessions = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT * FROM public.training_sessions 
    WHERE user_id = $1 AND session_date = $2
    ORDER BY created_at ASC
  `;
  const result = await pool.query(query, [userId, today]);
  return result.rows;
};

export const getWeeklyTrainingSessions = async (userId) => {
  const query = `
    SELECT * FROM public.training_sessions 
    WHERE user_id = $1 AND session_date >= CURRENT_DATE - INTERVAL '7 days'
    ORDER BY session_date DESC, created_at ASC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const getMedicationLogs = async (userId) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT ml.*, 
           CASE 
             WHEN ml.taken_at::date = CURRENT_DATE THEN 'taken'
             WHEN ml.taken_at::date < CURRENT_DATE THEN 'missed'
             ELSE 'pending'
           END as status
    FROM public.medication_logs ml
    WHERE ml.user_id = $1 
    AND ml.log_date >= CURRENT_DATE - INTERVAL '7 days'
    ORDER BY ml.log_date DESC, ml.taken_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const getNutritionTrends = async (userId, days = 7) => {
  const query = `
    SELECT 
      log_date,
      calories_consumed,
      protein_g,
      carbs_g,
      fats_g,
      water_intake_l,
      sodium_mg,
      sugar_g
    FROM public.daily_nutrition_logs 
    WHERE user_id = $1 
    AND log_date >= CURRENT_DATE - INTERVAL '${days} days'
    ORDER BY log_date ASC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};
