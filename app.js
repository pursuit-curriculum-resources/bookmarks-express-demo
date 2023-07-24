// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
  console.log("This code runs for every request");
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// /colors routes
const bookmarksController = require("./controllers/bookmarksController.js");
app.use("/bookmarks", bookmarksController);

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});

// EXPORT
module.exports = app;
