import pool from "./db.js";
import dotenv from "dotenv"

dotenv.config()


async function testConnection(){
    try{
        
        const connection = await pool.connect();
        console.log("XXXXXXXXX db connected XXXXXX")
    } catch(error){
        console.error("error " + error)
    }
    finally{
        process.exit();
    }
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER)
console.log(process.env.DB_HOST)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_PORT)

}

testConnection();