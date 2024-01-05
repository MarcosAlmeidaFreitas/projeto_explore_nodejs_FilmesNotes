const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");


class NotesController{
  async create(request, response){
    const {title, description, rating, tags} = request.body;
    const user_id = request.params.user_id;

    if(!title) throw new AppError("O titulo da nota é necessário");
    if(!{tags}) throw new AppError("Pelo menos uma tag é necessária");
    
    const [ note_id ] = await knex('notes')
      .insert({ title, description, rating, user_id });

    console.log(note_id);
    
    const tagsInsert = tags.map(name => {
      return {
        note_id,
        user_id,
        name
      }
    });

    await knex("tags").insert(tagsInsert);

    response.status(200).json();
  }

  async delete(request, response){
    const id   = request.params.note_id;

    await knex('notes').where({id : id}).delete();

    response.status(200).json();
  }

  async show(request, response){
    const id = request.params.note_id;

    const note = await knex('notes').where({id : id}).first();
    const tags = await knex('tags').where({note_id: id});

    const nameTags = tags.map(tag => {
      return tag.name;
    });

    response.status(200).json({
      note, nameTags
    });
  }

  async index(request, response){
    
  }
}


module.exports = NotesController;