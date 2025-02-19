import mongoose from "mongoose";

const {Schema} = mongoose

const TodoSchema = new Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },

    isCompleted: {
        type: Boolean,
        default: false
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

}, {timestamps: true})

export const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);