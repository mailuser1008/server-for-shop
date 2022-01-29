const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = express();

app.use(cors(""));
app.use(express.json());

const url = "mongodb://localhost:27017/";

MongoClient.connect(url);

module.exports = MongoClient;
