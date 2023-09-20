"use server";

import { connectToDB } from "../connect";
import { revalidatePath } from "next/cache";

import Todo from "../schema/todo";

export const createTodo = async ({ title, description, path }) => {
  try {
    connectToDB();
    await Todo.create({
      title,
      description,
      is_completed: false,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const UpdateTodo = async ({ _id, title, description, path }) => {
  try {
    connectToDB();
    await Todo.findByIdAndUpdate(_id, { title, description });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const GetTodoById = async (id) => {
  try {
    connectToDB();
    const Task = await Todo.findById(id);
    return { Task };
  } catch (error) {
    console.log(error);
  }
};

export const GetAllTodo = async () => {
  try {
    connectToDB();
    const Task = await Todo.find({});
    return { Task };
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async ({ _id, path }) => {
  try {
    connectToDB();
    await Todo.deleteOne({ _id });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const setAsComplete = async ({ _id, path }) => {
  try {
    connectToDB();
    await Todo.findByIdAndUpdate(_id, { is_completed: true });
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
};
