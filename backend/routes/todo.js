import express from "express";
import { getTodos, postTodo, deleteTodo, updateTodo } from '../controllers/todo.js';

const router = express.Router();

router.get("/", getTodos);
router.post("/", postTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
