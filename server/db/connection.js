import "dotenv/config";
import pkg from "pg";
const { Client } = pkg;

const database = {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
};

const testDatabase = {
  database: process.env.DB_TEST_DATABASE,
  user: process.env.DB_TEST_USER,
  password: process.env.DB_TEST_PASSWORD,
  host: process.env.DB_TEST_HOST,
  port: process.env.DB_TEST_PORT,
};

const config = process.env.NODE_ENV === "test" ? testDatabase : database;

const client = new Client(config);
await client.connect();

export default client;
