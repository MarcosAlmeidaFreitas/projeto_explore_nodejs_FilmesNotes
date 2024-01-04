const NotesController = require("../controllers/NotesController");
const {Router} = require("express");

const notesController = new NotesController();
const routes =  Router();

routes.use("/:user_id", notesController.create);

module.exports = routes;  