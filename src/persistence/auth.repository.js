import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM public.users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const createUser = async ({ first_name, last_name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO public.users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, first_name, last_name, email, created_at
  `;
  const result = await pool.query(query, [first_name, last_name, email, hashedPassword]);
  return result.rows[0];
};