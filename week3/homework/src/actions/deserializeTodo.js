module.exports = async function(request) {
  const todo = request.body;
  if (todo == null)
     throw new Error('todo not set');

  if (todo.description != null)
    todo.description = todo.description.trim();

  if (todo.description == null || todo.description.length === 0)
    throw new Error('description not set');

  return todo;
};
