import pool from '../config/db.js';

export const getProfileByUserId = async (userId) => {
  const query = 'SELECT * FROM public.user_profiles WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

export const getUserWithProfile = async (userId) => {
  const query = `
    SELECT 
      u.id, u.first_name, u.last_name, u.email, u.date_of_birth, u.gender,
      up.profile_type, up.height_cm, up.current_weight_kg, up.target_weight_kg,
      up.activity_level, up.has_diabetes, up.has_hypertension, up.has_obesity,
      up.athlete_discipline, up.training_frequency
    FROM public.users u
    LEFT JOIN public.user_profiles up ON u.id = up.user_id
    WHERE u.id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};
