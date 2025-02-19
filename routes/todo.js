import express from 'express'
import { protect } from '../middleware/auth.js';
import { createTodo, deleteTodo, getAllTodos, getATodo, updateTodo } from '../controller/todo.js';
import { createTodoErrorHandler, todoIdErrorHandler } from '../middleware/todo.js';

const TodoRouter = express.Router()

TodoRouter.post("/", protect, createTodoErrorHandler, createTodo)
TodoRouter.get("/", protect, getAllTodos)
TodoRouter.get("/:id", protect, todoIdErrorHandler, getATodo)
TodoRouter.put("/:id", protect, todoIdErrorHandler, updateTodo)
TodoRouter.delete("/:id", protect, todoIdErrorHandler, deleteTodo)

export default TodoRouter