import authRouter from "./auth"
import TodoRouter from "./todo"

export const rootRouter = (app) => {
    app.use('/auth', authRouter)
    app.use('/todos', TodoRouter)
}