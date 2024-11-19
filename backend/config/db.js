// Load environment variables from .env file
require("dotenv").config();

// Use environment variables to configure the database connection
const mysql = require("mysql2");

const pool = mysql.createPool({
	host: process.env.DB_HOST, // Fetching the host from the .env file
	user: process.env.DB_USER, // Fetching the user from the .env file
	password: process.env.DB_PASSWORD || "", // Fetching the password from the .env file
	database: process.env.DB_NAME, // Fetching the database name from the .env file
});

module.exports = pool.promise();
