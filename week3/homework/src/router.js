const TODO_SLUG = 'todos';

const FILENAME = 'todos.json';

const Todo = require('./todo');

const todo = new Todo(FILENAME);

const {
  createTodo,
  updateTodo,
  deleteTodo,
  readTodos,
  clearTodos,
  readTodo,
  markAsDone,
  markAsNotDone
} = require('./actions')

//The bind() method creates a new function that, when called, has its this keyword set to the provided value,
//with a given sequence of arguments preceding any provided when the new function is called.
module.exports = (app) => {
  app.post(`/${TODO_SLUG}`,createTodo.bind(null, todo))

  app.get(`/${TODO_SLUG}`,readTodos.bind(null,todo))

  app.delete(`/${TODO_SLUG}/:id`,deleteTodo.bind(null,todo))

  app.put(`/${TODO_SLUG}/:id`,updateTodo.bind(null,todo))

  //clearTodos
  app.delete(`/${TODO_SLUG}`, clearTodos.bind(null, todo))
  //readTodo
  app.get(`/${TODO_SLUG}/:id`, readTodo.bind(null, todo))
  //maekAsDone
  app.post(`/${TODO_SLUG}/:id/done`,markAsDone.bind(null,todo))
  //markAsNotDone
  app.delete(`/${TODO_SLUG}/:id/done`,markAsNotDone.bind(null,todo))
}
