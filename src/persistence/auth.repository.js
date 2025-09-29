import pool from "../config/db.js"


export const GetUserByEmail = async (email) =>{
    const query = "select * from USERS where EMAIL = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0]
}