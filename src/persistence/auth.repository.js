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