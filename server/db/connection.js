import { MongoClient, ServerApiVersion } from "mongodb";

// grabbing the URL we created earlier in config.env
const URI = process.env.ATLAS_URI || "";

// creating a new client and passing that URI, in addition to a few things 
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) { // if there's an error we'll catch and output in console 
  console.error(err);
}

// get our employees database (will get automatically created if doesn't exist) and export that 
let db = client.db("employees");

export default db;