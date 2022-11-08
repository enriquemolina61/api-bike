const route = require('express').Router();
const controllerTodos = require('../controllers/todos.controller');

/* GET ALL */
route.get('/find-all', controllerTodos.findAllTodosController);

/* GET BY ID */
route.get('/todo/:id', controllerTodos.findByIdTodoController);

/* CREATE TODO */
route.post('/create', controllerTodos.createTodoController);

/* UPDATE BY ID */
route.put(
  '/update/:id',
  controllerTodos.updateTodoController,
);

/* DELETE BY ID */
route.delete(
  '/delete/:id',
  controllerTodos.deleteTodoController,
);

module.exports = route;
