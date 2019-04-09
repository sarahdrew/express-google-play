const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(morgan("common"));
const apps = require("./apps.js");

app.use(cors());

app.get("/apps", (req, res) => {
  const { search = "", sort } = req.query;

  if (sort) {
    if (!["title", "genre"].includes(sort)) {
      return res.status(400).send("Sort must be one of title or genre");
    }
  }
  let results = apps.filter(apps =>
    apps.title.toLowerCase().includes(search.toLowerCase())
  );
  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
});

module.exports = app;
