import { Schema, models, model } from "mongoose";

const TodoSchema = new Schema(
  {
    title: { type: String, required: "Title is Required" },
    description: { type: String, required: "Description is Required" },
    is_completed: { type: Boolean },
  },
  { timestamps: true }
);

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
