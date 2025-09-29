import pool from "./db.js";


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


}

testConnection();