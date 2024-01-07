const NotesController = require("../controllers/NotesController");
const {Router} = require("express");

const notesController = new NotesController();
const notesRoutes =  Router();

notesRoutes.get("/", notesController.index);
notesRoutes.post("/:user_id", notesController.create);
notesRoutes.delete("/:note_id", notesController.delete);
notesRoutes.get("/:note_id", notesController.show);

module.exports = notesRoutes;  