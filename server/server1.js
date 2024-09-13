const express = require("express");
const mongoose = require("mongoose");
const History = require("./model");
const app = express();
const cors = require("cors");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://bshivanag2677:iDrxvwuyn5pksfXA@cluster0.wxexq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db connected");
  });

app.use(express.json());
app.use(cors({ origin: "*" }));

// Endpoint to save prediction data
app.post("/history", async (req, res) => {
  try {
    const { location, sqft, bath, bhk, price } = req.body;

    let newhistory = new History({
      location,
      sqft,
      bath,
      bhk,
      price,
      timestamp: new Date(), // Ensure timestamp is set
    });
    await newhistory.save();
    res.status(200).send("Successfully added to history");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

// Endpoint to fetch all history data
app.get("/data", async (req, res) => {
  try {
    const historyb = await History.find().sort({ timestamp: -1 });
    console.log("hello");
    res.json(historyb);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});
// Endpoint to delete a history item by ID
app.delete("/history/:id", async (req, res) => {
  try {
    console.log("id");
    const { id } = req.params;
    await History.findByIdAndDelete(id);
    res.status(200).send("History item deleted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

// Start server
app.listen(5000, () => {
  console.log("server running on port 5000");
});
