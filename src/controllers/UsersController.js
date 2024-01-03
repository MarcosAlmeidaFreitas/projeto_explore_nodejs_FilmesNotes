//Importante que o knex venha dessa configuração para a inserção de dados no banco.
const knex = require("../database/knex/index");
const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError");


class UsersController{
  async create(request, response){
    const {name, email, password} = request.body;

    // Checando se o usuário já está cadastrado com email
    const checkUserExists = await knex("users").where({email : email}).first();
    
    console.log(checkUserExists);

    if(checkUserExists){
       throw new AppError("Este email já está em uso");
    }

    //Verificando se os campos estão vazios
    if(!name){
       throw new AppError("O campo nome deve ser preenchido");
    } 
    
    if(!password){
      throw new AppError("O campo senha deve ser preenchido");
    }

    //criptografando a senha do usuário
    const hashedPassword = await hash(password, 8);

    await knex('users').insert({name, email, password:hashedPassword});

    response.status(201).json(`O usuário ${name} foi criado com sucesso.`);
  }
}

module.exports = UsersController;