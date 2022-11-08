const todosService = require('../services/todos.service');

const findAllTodosController = async (req, res) => {
  try {
    const allTodos = await todosService.findAllTodosService();
    res.send(allTodos);
  } catch (err) {
    res.status(500).send(err);
  }
};

const findByIdTodoController = async (req, res) => {
  try {
    const chosenTodo = await todosService.findByIdTodoService(req.params.id);
    if (!chosenTodo) {
      res.status(404).send({ message: 'Bicycle not found!' });
      return;
    }
    res.send(chosenTodo);
  } catch (err) {
    res.status(400).send(err);
  }
};

const createTodoController = async (req, res) => {
  try {
    const newPaleta = await todosService.createTodoService(req.body);
    if (!newPaleta)
      throw { name: 'InternalServerError', message: 'Todo not created' };
    res.status(201).send(newPaleta);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateTodoController = async (req, res) => {
  try {
    // req.body contains id -> via middleware
    const parada = req.body;
    parada.id = +req.params.id;
    const updatedTodo = await todosService.updateTodoService(parada);

    if (!updatedTodo)
      throw { name: 'NotFoundError', message: 'Todo ID not found' };
    res.send(updatedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const deletedTodo = await todosService.deleteTodoService(req.params.id);
    if (deletedTodo === null)
      throw { name: 'NotFoundError', message: 'Todo ID not found' };
    res.send({
      message: 'Successfully deleted Bicycle!',
      palette: deletedTodo,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  findAllTodosController,
  findByIdTodoController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
