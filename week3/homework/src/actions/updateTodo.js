const deserializeTodo = require('./deserializeTodo')

module.exports = (todo,request,response) => {
  deserializeTodo(request,response)
    .then(({description}) => {
       const id = request.params.id;
       return todo.update(id, description);
    })
    .then(todo => {
      response.status(200)
      response.json({todo})
    })
    .catch(({message,code}) =>{
        response.status(code == 'not-found' ? 404 : 5000)
        response.json({error: message})
    })
}
