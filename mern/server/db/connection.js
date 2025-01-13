// a package that loads environment variables from a .env file into process.env.
// this helps keep sensitive information like database credentials secure and separate from code.
import dotenv from 'dotenv';
dotenv.config(); // Reads and loads environment variables from .env file.

// MongoClient is used to interact with the MongoDB database, while
// serverApiVersion defines which version of the MongoDB API to use for interactions.
import { MongoClient, ServerApiVersion } from "mongodb";

// retrieves the MongoDB connection string (URI) from the environment variables (set in .env) under ATLAS_URI.
// if it's not found, it defaults to an empty string.
const URI = process.env.ATLAS_URI || "";

// creates an instance of MongoClient with the URI for the MongoDB server and additional configuration options.
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1, // using v1 of MongoDB API.
    strict: true, // enforces strict mode, meaning MongoDB will reject commands that aren't supported by the current version.
    deprecationErrors: true, // makes sure the app will throw errors for deprecated MongoDB features, ensuring compatibility.
  },
});

try {
  // connects to the MongoDB server asynchronously.
  // the await ensures the program waits for the connection to establish before proceeding.
  // other tasks or functions across the program can continue executing in parallel while waiting for this.  
  await client.connect();  
 
  // executes a ping command on the admin database to check if the connection is working.
  await client.db("admin").command({ ping: 1 });

  // if the ping is successful, this message is logged.
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  // if any error occurs during connection or the ping command, it’s caught and logged to the console.
} catch (err) {
  console.error(err);
}

// once connected, this line selects the "employees" database.
// if the database doesn’t exist, MongoDB will create it when data is written to it.
let db = client.db("employees");

// exports the db instance (representing the "employees" database)
// so it can be used in other parts of the project.
export default db;

