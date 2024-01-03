const knex = require("knex");
const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError");


class UsersController{
  async create(request, response){
    let {name, email, password} = request.body;

    // Checando se o usuário já está cadastrado com email
    //const checkUserExists = await knex("users").where({email : email}).first();
    
    // if(checkUserExists){
    //   throw new AppError("Este email já está em uso", 401);
    // }

    //Verificando se os campos estão vazios
    if(!name){
       throw new AppError("O campo nome deve ser preenchido");
    } 
    
    if(!password){
      throw new AppError("O campo senha deve ser preenchido");
    }

    //criptografando a senha do usuário
    password = await hash(password, 8);

    await knex('users').insert([{name: name},{email: email}, {password: password}]);

    response.status(201).json(`Usuário ${name} criado com sucesso.`);

    console.log(name, email, password);
  }
}

module.exports = UsersController;