import dotenv from "dotenv"

import {Pool} from "pg"

dotenv.config()


const pool = new Pool ({
    user : process.env.DB_USER || 'postgres',
    host : process.env.DB_HOST || 'localhost',
    database : process.env.DB_DATABASE || 'nutritrack',
    password : process.env.DB_PASSWORD || 'password',
    port : process.env.DB_PORT || 5432
})

console.log(process.env.DB_NAME);
console.log(process.env.DB_USER)
console.log(process.env.DB_HOST)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_PORT)

export default pool ;