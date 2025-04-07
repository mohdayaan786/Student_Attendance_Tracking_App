import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "attendance_db_dev",
    password: "1234",
    port: '3306',
});

const db = drizzle({ client: connection });
