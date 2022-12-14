const notes = require("express").Router();
const fs = require('fs');
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`a Note has been added successfully 🚀`);
  } else {
    res.err("Error in adding a note ");
  }
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
notes.delete("/:id", (req, res) => {
  console.log("HIT");
  // reading notes form db.json
  let db = JSON.parse(fs.readFileSync("./db/db.json"));
  // removing note with id
  let deleteNotes = db.filter((item) => item.id !== req.params.id);
  // Rewriting note to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});


module.exports = notes;
