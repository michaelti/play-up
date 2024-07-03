import "dotenv/config";
import mysql from "mysql2/promise";

const database = {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
};

const testDatabase = {
  database: process.env.DB_TEST_DATABASE,
  user: process.env.DB_TEST_USER,
  password: process.env.DB_TEST_PASSWORD,
  host: process.env.DB_TEST_HOST,
};

const config = process.env.NODE_ENV === "test" ? testDatabase : database;

export default await mysql.createConnection(config);
