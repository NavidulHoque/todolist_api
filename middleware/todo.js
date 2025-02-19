import mongoose from "mongoose"
import { User } from "../models/User.js"
import { Todo } from "../models/Todo.js"

export const createTodoErrorHandler = async (req, res, next) => {

    const { userId } = req.body

    try {

        if (!userId) {

            return res.status(400).json({
                message: "User ID is required"
            })
        }

        const user = mongoose.Types.ObjectId.isValid(userId) && await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        next()
    }

    catch (error) {
        next(error)
    }
}

export const todoIdErrorHandler = async (req, res, next) => {

    const { id } = req.params

    try {
        const todo = mongoose.Types.ObjectId.isValid(id) && await Todo.findById(id)

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        next()
    } 
    
    catch (error) {
        next(error)
    }
}