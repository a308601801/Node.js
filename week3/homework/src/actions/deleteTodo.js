const deserializeTodo = require('./deserializeTodo')

module.exports = (todo,request,response) => {
  const id = request.params.id;
  todo.delete_(id)
    .then(() => {
      response.status(204)
      response.end()
    })
    .catch(({message}) => {
      response.status(500)
      response.json({error : message})
    })
}
