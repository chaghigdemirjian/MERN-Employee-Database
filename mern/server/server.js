import express from "express"; // imports library that's used to create a server.
import cors from "cors"; // Library that enables secure cross-origin communication via APIs.

import dotenv from "dotenv"; // For loading environment variables.
dotenv.config(); // Load environment variables from .env file.

// The "record.js" file defines an Express router with CRUD operations for interacting with a MongoDB database.
import records from "./routes/record.js"; // imports the file "record.js" within routes folder.

const PORT = process.env.PORT || 5050;

const app = express(); // creates an express application.

// allows our express app to use cors middleware to handle cross-origin requests.
app.use(cors());

// express.json() parses JSON data from the request body, converts to JavaScript and atatches output to req.body. 
app.use(express.json());

// requests made to /record are delegated to the routing logic defined in the record.js file.
app.use("/record", records); // sets up /record as the base path.

// defines a route for "/" URL.
app.get("/", (req, res) => {
  res.send("Server is up and running! Go to localhost:5050/record to see employee data.");
});


// start the Express server to listen for incoming requests on the specified port.
// arrow function gets executed when the server starts successfully.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

