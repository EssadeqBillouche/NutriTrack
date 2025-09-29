import db from '../config/db.js'; 

export async function getProfileByUserId(userId) {
  const query = 'SELECT * FROM user_profiles WHERE user_id = ?';
  const [rows] = await db.execute(query, [userId]);
  return rows[0];
}
