import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express(); // get express server going 

app.use(cors());
app.use(express.json());
app.use("/record", records); // /record includes all records. if we want to access a specific record, we'll have /record/[id].

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});