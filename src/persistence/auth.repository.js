import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const createUser = async ({ first_name, last_name, email, password, age, gender }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO public.users (first_name, last_name, email, password_hash, date_of_birth, gender)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, first_name, last_name, email, created_at
  `;
  const result = await pool.query(query, [first_name, last_name, email, hashedPassword, age, gender]);
  return result.rows[0];
};

export const setProfile = async ({userId, profileType, height, currentWeight, targetWeight, activity_level, hasDiabetes, hasHypertension, hasObesity, disipline, trainingFrequency}) =>
    {
        const query = "INSERT INTO user_profiles values(user_id, profile_type, height_cm, current_weight_kg, target_weight_kg, activity_level, has_diabetes, athlete_discipline, training_frequency , has_obesity, has_hypertension) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
        const result = await pool.query(query, {userId, profileType, height, currentWeight, targetWeight, activity_level, hasDiabetes, hasHypertension, hasObesity, disipline, trainingFrequency})
        return result.row[0];
    }


const getProfile = async (userId) =>
{
    const query = `select * from users where user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];

}