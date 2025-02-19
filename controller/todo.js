import { Todo } from "../models/Todo.js"

export const createTodo = async (req, res, next) => {

    const { title, userId } = req.body

    try {

        const todo = await Todo.create({ title, userId })

        const populatedTodo = await todo.populate("userId", "username");

        const { _id, isCompleted, createdAt, updatedAt } = populatedTodo

        return res.status(201).json({
            todo: {
                id: _id,
                title,
                isCompleted,
                createdAt,
                updatedAt,
                user: {
                    id: userId,
                    username: populatedTodo.userId.username
                }
            },
            message: "Todo created successfully"
        })

    }

    catch (error) {
        next(error)
    }
}

export const getAllTodosOfUser = async (req, res, next) => {

    const {userId} = req.params

    try {

        const todos = await Todo.find({userId})
            .populate("userId")
            .lean() // Convert the document to a plain JavaScript object which optimizes the performance

        const formattedTodos = todos.map(({ _id, title, isCompleted, createdAt, updatedAt, userId }) => ({
            id: _id,
            title,
            isCompleted,
            createdAt,
            updatedAt,
            userId: {
                id: userId._id,
                username: userId.username,
            },
        }));

        return res.status(200).json({
            todos: formattedTodos
        })
    }

    catch (error) {
        next(error)
    }
}

export const updateTodo = async (req, res, next) => {

    const { id } = req.params
    const { title, isCompleted } = req.body

    try {

        const todo = await Todo.findByIdAndUpdate(id,
            {
                title,
                isCompleted
            },
            { new: true, runValidators: true })

        const populatedTodo = await todo.populate("userId", ["username", "_id"]);

        const {createdAt, updatedAt, userId: {_id, username}} = populatedTodo

        return res.status(200).json({
            todo: {
                id,
                title,
                isCompleted,
                createdAt,
                updatedAt,
                user: {
                    id: _id,
                    username
                }
            },
            message: "Todo updated successfully"
        })
    }

    catch (error) {
        next(error)
    }
}

export const deleteTodo = async (req, res, next) => {

    const { id } = req.params

    try {

        await Todo.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Todo deleted successfully"
        })
    }

    catch (error) {
        next(error)
    }
}