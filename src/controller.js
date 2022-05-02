import todos from "./data.js";

const data = todos;

export default class Controller {
  constructor() {}
  async getTodos() {
    return new Promise((resolve, _) => {
      resolve(data);
    });
  }
  // creating a todo
  async createTodo(todo) {
    return new Promise((resolve, _) => {
      // create a todo, with random id and data sent
      let newTodo = {
        id: Math.floor(4 + Math.random() * 10),
        ...todo,
      };

      // return the new created todo
      resolve(newTodo);
    });
  }

  // updating a todo
  async updateTodo(id) {
    return new Promise((resolve, reject) => {
      // get the todo.
      let todo = data.find((todo) => todo.id === parseInt(id));
      // if no todo, return an error
      if (!todo) {
        reject(`No todo with id ${id} found`);
      }
      //else, update it by setting completed to true
      todo["completed"] = true;
      // return the updated todo
      resolve(todo);
    });
  }

  // deleting a todo
  async deleteTodo(id) {
    return new Promise((resolve, reject) => {
      // get the todo
      let todo = data.find((todo) => todo.id === parseInt(id));
      // if no todo, return an error
      if (!todo) {
        reject(`No todo with id ${id} found`);
      }
      // else, return a success message
      resolve(`Todo deleted successfully`);
    });
  }
}
