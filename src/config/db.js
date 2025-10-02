import dotenv from "dotenv"

import {Pool} from "pg"

dotenv.config()


const pool = new Pool ({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT
})

console.log(process.env.DB_NAME);
console.log(process.env.DB_USER)
console.log(process.env.DB_HOST)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_PORT)

export default pool ;