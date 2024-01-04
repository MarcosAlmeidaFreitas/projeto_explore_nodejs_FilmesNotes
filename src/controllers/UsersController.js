//Importante que o knex venha dessa configuração para a inserção de dados no banco.
const knex = require("../database/knex/index");
const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError");
const salt = 8;

class UsersController{
  async create(request, response){
    const {name, email, password} = request.body;
    
    //Verificando se os campos estão vazios
    if(!name){
      throw new AppError("O campo nome deve ser preenchido");
    } 

    if(!email){
      throw new AppError("O campo email deve ser preenchido");
    }
 
    if(!password){
      throw new AppError("O campo senha deve ser preenchido");
    }

    // Checando se o usuário já está cadastrado com email
    const checkUserExists = await knex("users").where({email : email}).first();
    
    if(checkUserExists){
      throw new AppError("Este email já está em uso");
    }
  

    //criptografando a senha do usuário
    const hashedPassword = await hash(password, salt);

    await knex('users').insert({name, email, password:hashedPassword});

    response.status(201).json(`O usuário ${name} foi criado com sucesso.`);
  }

  async update(request, response){
    const { name, email, password, oldPassword } = request.body;
    const id  = request.params;
    
    const user = await knex('users').where(id).first();
    
    //Verificando se o usuário existe
    if(!user) throw new AppError("O usuário não foi encontrado");

    
    if(email){
      //Verificando se existe um usuário com o email informado
      const userWithUpdatedEmail = await knex('users').where({email: email}).first();

      if(userWithUpdatedEmail && userWithUpdatedEmail.id != user.id){
        throw new AppError("Já existe um usuário com o email informado");
      }

      user.email = email ?? user.email;
    }

    user.name = name ?? user.name;

    if(password && !oldPassword) throw new AppError("Você precisa informar a senha antiga para definir a nova");

    if(password && oldPassword){
      const checkPassword = await compare(oldPassword, user.password);

      if(!checkPassword) throw new AppError("A senha antiga não confere");

      user.password = await hash(password, salt);
    }
    
    await knex('users').where({id : user.id}).update(user);
    response.status(200).json({});
  }
}

module.exports = UsersController;