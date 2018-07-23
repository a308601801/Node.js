const deserializeTodo = require('./deserializeTodo')

module.exports = (todo,req,res) => {
  deserializeTodo(req,res)
    .then(({description}) => todo.create(description))
    .then(todo => {
      res.status(201)
      res.json({todo})
    })
    .catch(({message}) => {
      res.status(500)
      res.json({error : message})
    })
}
