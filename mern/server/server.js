import express from "express"; // imports library that's used to create a server.
import cors from "cors"; // Library that enables secure cross-origin communication between the frontend and backend via APIs.

import dotenv from "dotenv"; // For loading environment variables.
dotenv.config(); // Load environment variables from .env file.

// The "record.js" file defines an Express router with CRUD operations for interacting with a MongoDB database.
import records from "./routes/record.js"; // imports the file "record.js" within routes folder.

// The code checks if there is a PORT environment variable.
// If it's present, it uses that value; otherwise, it defaults to 5050.
// This approach allows flexibility in choosing a port for different environments (development, production, etc.).
const PORT = process.env.PORT || 5050;

const app = express(); // creates an express application.

// allows our express app to use cors middleware to handle cross-origin requests.
// ensures backend can respond to requests from a different domain [e.g., our front end].
app.use(cors());

// express.json() parses JSON data from the request body,
// converts it to a JavaScript object, and attaches it to req.body for easy access in route handlers.
app.use(express.json());

// sets up a route for handling requests to /record,
// delegating those requests to the routing logic defined in the record.js file.
app.use("/record", records); // /record is the base path.

// define a route for "/" URL.
// This is an arrow function that handles the request. req is the request object containing information about
// the HTTP request (e.g., headers, query parameters), and res is the response object
// used to send a response back to the client.
app.get("/", (req, res) => {
  res.send("Server is up and running! Go to localhost:5050/record to see employee data.");
});


// start the Express server to listen for incoming requests on the specified port.
// includes an arrow function that gets executed when the server starts successfully.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

