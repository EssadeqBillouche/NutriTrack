const db = require('../config/db');

module.exports = {
  getProfileByUserId: async (userId) => {
    const query = 'SELECT * FROM user_profiles WHERE user_id = ?'; 
    const [rows] = await db.execute(query, [userId]);  
    
    return rows[0];  
  }
};