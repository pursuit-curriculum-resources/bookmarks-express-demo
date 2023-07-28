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
  const { arrayIndex } = req.params;
  if (bookmarksArray[arrayIndex]) {
    res.json(bookmarksArray[arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// Create
bookmarks.post("/", validateURL, (req, res) => {
  bookmarksArray.push(req.body);
  res.json(bookmarksArray[bookmarksArray.length - 1]);
});

// DELETE
bookmarks.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (bookmarksArray[arrayIndex]) {
    const deletedBookMark = bookmarksArray.splice(arrayIndex, 1);
    res.status(200).json(deletedBookMark[0]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// UPDATE
bookmarks.put("/:arrayIndex", validateURL, async (req, res) => {
  const { arrayIndex } = req.params;
  if (bookmarksArray[arrayIndex]) {
    bookmarksArray[arrayIndex] = req.body;
    res.status(200).json(bookmarksArray[arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = bookmarks;
