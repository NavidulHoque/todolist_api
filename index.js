import express from 'express'
import connectDatabase from './config/connectDatabase.js'
import { PORT } from './config/config.js'
import authRouter from './routes/auth.js'
import TodoRouter from './routes/todo.js'
import errorHandler from './middleware/errorHandler.js'
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js'

const app = express()

app.use(express.json())

// Rate limiter middleware
app.use(rateLimiter);

app.get('/', (req, res) => {
    return res.send('Welcome to Todo List API!')
})

app.use('/auth', authRouter)
app.use('/todos', TodoRouter)

// not found route handler middleware
app.use(notFoundHandler)

//error handler middleware
app.use(errorHandler);

async function startServer() {

    await connectDatabase()

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer()