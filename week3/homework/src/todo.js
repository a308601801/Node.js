const fs = require('fs')
const uuid = require('uuid/v4')

const DEFAULT_ENCODING = 'utf8';

class Todo {
  constructor(filename) {
    this._filename = filename
  }

  //read file from server and create a list
  //create a new todo JSON with new id
  //push the new todo into todos list
  //save - replace the new list
  //finally return todo
  async create(description){
    const todos = await this.read()

    const todo = {
      id : uuid(),
      done : false,
      description
    };

    todos.push(todo)

    await this._save(todos)

    return todo;
  }


  read(){
    return new Promise(resolve => {
      fs.readFile(this._filename, DEFAULT_ENCODING,(error, data) => {
        if(error){
          console.log(error)
          return resolve([])
        }
        console.log(data)
        if(data == '') return resolve()
        return resolve(JSON.parse(data))
      })
    })
  }
  //read json todo and assign values to a list
  //find todo with id
  //if todo is not found throw error
  //asign new description
  //save new list

  getId(id, fl){
    let id_ = fl.find(t => t.id === id)
    if(id_ == null){
      const error = new Error(`To-do with ID ${id_} does not exist`);
      error.code = 'not-found';
      return error;
    }
    return id_
  }
  
  async update(id,description){
    const todos = await this.read()
    const todo = this.getId(id, todos)
    todo.description = description

    await this._save(todos)
    return todo;
  }

  async delete_(id){
    const todos = await this.read()
    const filteredTodos = todos.filter(t => t.id !== id) //The non-identity operator returns true if the operands are not equal and/or not of the same type
    return this._save(filteredTodos)
  }

  _save(todos){
    return new Promise((resolve,reject) => {
      fs.writeFile(
        this._filename,
        JSON.stringify(todos,null,2),
        error => error == null ? resolve() : reject(error)
      )
    })
  }

  delete_all() {
    return this._save([])
  }

  async read_one(id) {
    const todos = await this.read()
    const todo = this.getId(id, todos)
    return todo;
  }

  async asDone(id) {
    const todos = await this.read()
    const todo = this.getId(id, todos)
    todo.done = true

    await this._save(todos)
    return todo;
  }

  async asNotDone(id) {
    const todos = await this.read()
    const todo = this.getId(id, todos)
    todo.done = false

    await this._save(todos)
    return todo;
  }
}

module.exports = Todo
