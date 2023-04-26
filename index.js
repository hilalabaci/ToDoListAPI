//jshint esversion:6
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import Item from "./models/item.js";

dotenv.config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/itemDB`
);
const app = express();
app.use(cors());
const jsonParser = bodyParser.json();

app.get("/", async function (req, res) {
  const filter = {};
  const all = await Item.find(filter);
  res.json(all);
});
app.post("/", jsonParser, async function (req, res) {
  const { text } = req.body;
  const newItem = new Item({
    value: text,
  });
  newItem.save();
  res.json(newItem.toJSON());
});
app.delete("/", async function (req, res) {
  const id = req.query.id;
  console.log(id);
  await Item.deleteOne({ _id: id });
  res.sendStatus(200);
});

app.listen(3003, function () {
  console.log("Server started on the port 3003");
});

export default app;
