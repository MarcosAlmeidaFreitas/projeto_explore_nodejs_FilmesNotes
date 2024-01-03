require('express-async-errors');

const AppError = require("./utils/AppError");

const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

//Tratando sobre o erro do servidor e erro do cliente.
app.use((error, request, response, next) =>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "erro", 
    message: "internal server error"
  });
});

const port = 3333;

app.listen(port, () => console.log(`Server is running on port: ${port}`));