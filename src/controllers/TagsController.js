const knex = require("../database/knex/index");

class TagsController{
  
  async index(request, response){
    const user_id = request.params;

    const tags = await knex("tags").where(user_id);

    response.status(200).json(tags);
  }
}

module.exports = TagsController;