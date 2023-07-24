const express = require("express");
const bookmarks = express.Router();
const bookmarksArray = require("../models/bookmark.js");
const { validateURL } = require("../models/validations.js");

// Index
bookmarks.get("/", (req, res) => {
  res.json(bookmarksArray);
});

// Show
bookmarks.get("/:arrayIndex", (req, res) => {
  if (bookmarksArray[req.params.arrayIndex]) {
    res.json(bookmarksArray[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// Create
bookmarks.post("/", validateURL, (req, res) => {
  bookmarksArray.push(req.body);
  res.json(bookmarksArray[bookmarksArray.length - 1]);
});

module.exports = bookmarks;
