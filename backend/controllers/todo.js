import express from 'express';
import Todo from '../models/todo.js';
import Joi from "joi";

const router = express.Router();

export const getTodos = async (req, res) => {
    try {
        res.send( await Todo.find().sort({ date: -1 }) );
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
}

export const postTodo = async (req, res) => {
    try {
      const schema = Joi.object({
        task: Joi.string().min(3).max(300).required(),
        isComplete: Joi.boolean(),
        date: Joi.date(),
      });
  
      const { error } = schema.validate(req.body);
  
      if (error) return res.status(400).send(error.details[0].message);
  
      const { task, author, isComplete, date, uid } = req.body;
  
      const todo = new Todo({ task, author, isComplete, date, uid });
  
      res.send(await todo.save());
    } catch (error) {
      res.status(500).send("Error: " + error.message);
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
      const todo = await Todo.findById(id);
  
      if (!todo) return res.status(404).send("Todo not found...");
    
      res.send(await Todo.findByIdAndDelete(id));
    } catch (error) {
      res.status(500).send("Error: " + error.message);
    }
}

export const updateTodo = async (req, res) => {
    const schema = Joi.object({
      task: Joi.string().min(3).max(300).required(),
      isComplete: Joi.boolean(),
      date: Joi.date(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) return res.status(400).send(error.details[0].message);
  
    const { id } = req.params 
  
    try {
      const todo = await Todo.findById(id);
  
      if (!todo) return res.status(404).send("Todo not found...");
    
      const { task, author, isComplete, date, uid } = req.body;
    
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { task, author, isComplete, date, uid },
        { new: true }
      );
    
      res.send(updatedTodo);
    } catch (error) {
      res.status(500).send("Error: " + error.message);
    }
}

export default router;