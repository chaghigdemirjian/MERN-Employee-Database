// this file will allow us to set up API endpoints.

import express from "express"; // imports express library to handle routes.
import db from "../db/connection.js"; // imports db object from connections.js to interact w/ the database.

// imports ObjectId from MongoDB, which is used to convert string IDs
// into MongoDB’s unique identifier format.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// we will use the router instance to define route handlers like router.get(), router.post(), etc.
// the router will be added as a middleware and will take control of requests starting with path /record (see server.js file).
const router = express.Router();

// this section will help you get a list of all the records.

// sets up an endpoint for GET requests to /record/.
// when a request is made to /record/, this code will execute.
router.get("/", async (req, res) => {
  // accesses the "records" collection in the connected MongoDB database.
  let collection = await db.collection("records");

  // finds all documents in the collection (no filter applied).
  // converts the cursor (returned by find) into an array of documents.
  let results = await collection.find({}).toArray();

  // sends the array of documents (results) back to the client as the response.
  // sets the HTTP response status to 200 OK, indicating the request was successful.
  res.send(results).status(200);
});


// this section will help you get a single record by id.

// handles GET requests at /id where id is the record's unique identifier.
// the : before id is a placeholder indicating a dynamic route parameter.
// whatever comes after /record/ in the URL is captured as the value of id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records"); // same as above function.

  // extract id from the URL, convert the id to a MongoDB ObjectId,
  let query = { _id: new ObjectId(req.params.id) };  

  // fetches the record that matches the id from the URL.
  let result = await collection.findOne(query);

  // send an error message if result = Null (no match).
  if (!result) res.send("Not found").status(404);

  // if result isn't null, sends the result back to the client as the response.
  else res.send(result).status(200);
});

// this section will enable creating a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("records");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;

