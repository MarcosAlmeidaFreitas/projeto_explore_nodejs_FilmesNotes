const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");


class NotesController{
  async create(request, response){
    const {title, description, rating, tags} = request.body;
    const user_id = request.params.user_id;

    if(!title) throw new AppError("O nome da nota é necessário");
    if(!{tags}) throw new AppError("Pelo menos uma tag é necessária");
    
    const note = await knex('notes')
      .insert({ title, description, rating, user_id });

    const tagsInsert = tags.map(tag => {
      return {

      }
    })
  }
}

module.exports = NotesController;