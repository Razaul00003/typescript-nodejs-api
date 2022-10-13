import { Router } from "express";
import { Todo } from "./models/todo";
const router = Router();
let todos: Todo[] = [];
type RequestBody = { text: string };

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});
router.post("/post", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(200).json({ message: "todo added ", todo: newTodo, todos: todos });
});
router.put("/post/:todoId", (req, res, send) => {
  const tid = req.params.todoId;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: "todo updated", todos: todos });
  }
  res.status(400).json({ message: ` no todo found for this id. ${tid} ` });
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
  res.status(200).json({ message: "deleted todo", todos: todos });
});
export default router;
