const Bike = require('../models/Todo');

const findAllTodosService = async () => {
  const allTodos = await Bike.find();
  return allTodos.map((item) => ({
    id: item.bike_id,
    color: item.color,
    gears: item.gears,
    brand: item.brand,
    model: item.model,
    price: item.price,
    sold: item.sold,
  }));
};

const findByIdTodoService = async (id) => {
  const byIdTodo = await Bike.findOne({ todo_id: id });
  if (byIdTodo === null) return null;
  return {
    id: byIdTodo.todo_id,
    todo: byIdTodo.todo,
    completed: byIdTodo.completed,
    created_at: byIdTodo.created_at,
    completed_at: byIdTodo.completed_at ? byIdTodo.completed_at : null,
  };
};

const createTodoService = async (newTodo) => {
  const todoList = await findAllTodosService();
  const newTodoId = findFreeId(todoList);
  newTodo.bike_id = newTodoId;
  newTodo.sold = false;
  const createdTodo = await Bike.create(newTodo);
  return {
    id: createdTodo.bike_id,
    color: createdTodo.color,
    gears: createdTodo.gears,
    brand: createdTodo.brand,
    model: createdTodo.model,
    price: createdTodo.price,
    sold: createdTodo.sold,
  };
};

const updateTodoService = async (editedTodo) => {
  const oldTodo = await Bike.findOne({ bike_id: editedTodo.id });
  if (oldTodo === null) return null;

  oldTodo.color = editedTodo.color;
  oldTodo.gears = editedTodo.gears;
  oldTodo.brand = editedTodo.brand;
  oldTodo.model = editedTodo.model;
  oldTodo.price = editedTodo.price;
  oldTodo.sold = editedTodo.sold;
  await oldTodo.save();

  return {
    id: oldTodo.bike_id,
    color: oldTodo.color,
    gears: oldTodo.gears,
    brand: oldTodo.brand,
    model: oldTodo.model,
    price: oldTodo.price,
    sold: oldTodo.sold,
  };
};

const deleteTodoService = async (id) => {
  const selectTodo = await Bike.findOne({ bike_id: id });
  if (!selectTodo) return null;

  const deletedTodo = await Bike.findByIdAndDelete(selectTodo.id);
  return deletedTodo;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const findFreeId = (list) => {
  const sortedById = listSortedById(list);
  let previousId = 0;

  for (const item of sortedById) {
    if (item.id !== previousId + 1) {
      return previousId + 1;
    }
    previousId = item.id;
  }

  return previousId + 1;
};

const listSortedById = (list) => {
  return list.slice().sort((a, b) => a.id - b.id);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  findAllTodosService,
  findByIdTodoService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
};
