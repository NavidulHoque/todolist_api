import mongoose from "mongoose"
import { User } from "../models/User.js"
import { Todo } from "../models/Todo.js"

const validateId = async (id, model, res, next, entityName) => {

    try {
        const entity = mongoose.Types.ObjectId.isValid(id) && await model.findById(id)

        if (!entity) {
            return res.status(404).json({ 
                message: `${entityName} not found` 
            });
        }

        next();
    } 
    
    catch (error) {
        next(error);
    }
};

export const createTodoErrorHandler = async (req, res, next) => {

    const { userId } = req.body

    if (!userId) {

        return res.status(400).json({
            message: "User ID is required"
        })
    }

    validateId(userId, User, res, next, "User")
}

export const getAllTodosErrorHandler = async (req, res, next) => {

    const { userId } = req.params

    validateId(userId, User, res, next, "User")
}

export const todoIdErrorHandler = async (req, res, next) => {

    const { id } = req.params

    validateId(id, Todo, res, next, "Todo");
}