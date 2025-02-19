import express from 'express'
import { protect } from '../middleware/auth.js';
import { createTodo, deleteTodo, getAllTodosOfUser, updateTodo } from '../controller/todo.js';
import { createTodoErrorHandler, getAllTodosErrorHandler, todoIdErrorHandler } from '../middleware/todo.js';

const TodoRouter = express.Router()

TodoRouter.post("/", protect, createTodoErrorHandler, createTodo)
TodoRouter.get("/:userId", protect, getAllTodosErrorHandler, getAllTodosOfUser)
TodoRouter.put("/:id", protect, todoIdErrorHandler, updateTodo)
TodoRouter.delete("/:id", protect, todoIdErrorHandler, deleteTodo)

export default TodoRouter