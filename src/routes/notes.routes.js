const NotesController = require("../controllers/NotesController");
const {Router} = require("express");

const notesController = new NotesController();
const routes =  Router();

routes.post("/:user_id", notesController.create);
routes.delete("/:note_id", notesController.delete);
routes.get("/:note_id", notesController.show);

module.exports = routes;  