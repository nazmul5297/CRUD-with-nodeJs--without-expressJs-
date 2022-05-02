import Controller from "./controller.js";
import http from "http";
import getReqData from "./utils";

const TodoController = new Controller();
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // /api/TodoControllers : GET
  if (req.url === "/api/TodoControllers" && req.method === "GET") {
    // get the TodoControllers.
    const TodoControllers = await new TodoController().getTodoControllers();
    // set the status code, and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(TodoControllers));
  }

  // /api/TodoControllers/:id : GET
  else if (
    req.url.match(/\/api\/TodoControllers\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    try {
      // get id from url
      const id = req.url.split("/")[3];
      // get TodoController
      const TodoController = await new TodoController().getTodoController(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the data
      res.end(JSON.stringify(TodoController));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/TodoControllers/:id : DELETE
  else if (
    req.url.match(/\/api\/TodoControllers\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    try {
      // get the id from url
      const id = req.url.split("/")[3];
      // delete TodoController
      let message = await new TodoController().deleteTodoController(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify({ message }));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/TodoControllers/:id : UPDATE
  else if (
    req.url.match(/\/api\/TodoControllers\/([0-9]+)/) &&
    req.method === "PATCH"
  ) {
    try {
      // get the id from the url
      const id = req.url.split("/")[3];
      // update TodoController
      let updated_TodoController =
        await new TodoController().updateTodoController(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify(updated_TodoController));
    } catch (error) {
      // set the status code and content type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/TodoControllers/ : POST
  else if (req.url === "/api/TodoControllers" && req.method === "POST") {
    // get the data sent along
    let TodoController_data = await getReqData(req);
    // create the TodoController
    let TodoController = await new TodoController().createTodoController(
      JSON.parse(TodoController_data)
    );
    // set the status code and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    //send the TodoController
    res.end(JSON.stringify(TodoController));
  }

  // No route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
