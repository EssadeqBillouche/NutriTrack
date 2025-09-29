import pool from "../config/db.js"
import bcrypt from "b"


export const GetUserByEmail = async (email) =>{
    const query = "select * from USERS where EMAIL = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0]
}

export const creatUser = async ({firstName, LastName, email, password, birthDay, gender}) => {
    const query = "insert into users (first_name, last_name, email, password_hash, gender) ($1, $2, $3, $4, $5, $6)"
    const sendQuery = await pool.query(query, [firstName, LastName, email, password, birthDay, gender]);
    return sendQuery.row(0);
}