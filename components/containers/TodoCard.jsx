"use client";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { usePathname } from "next/navigation";
import {
  setAsComplete,
  deleteTodo,
  GetTodoById,
  UpdateTodo,
} from "@/lib/actions/todoActions";
import { Input } from "../ui/input";

const TodoCard = ({ _id, title, description, is_completed }) => {
  const path = usePathname();
  const [task, setTask] = useState({ title: "", description: "" });
  const [open, setOpen] = useState(false);

  const handleChange = ({ target }) => {
    setTask((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    (async () => {
      const { Task } = await GetTodoById(_id.toString());
      setTask({ title: Task.title, description: Task.description });
    })();
  }, [open]);

  const handleSetAsComplete = async () => {
    await setAsComplete({ _id, path });
  };

  const handleDelete = async () => {
    await deleteTodo({ _id, path });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await UpdateTodo({
      _id,
      title: task.title,
      description: task.description,
      path,
    });
    setOpen(false);
  };

  let content;

  if (path === "/") {
    content = (
      <Card className="max-w-[800px] shadow-lg">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col gap-5">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button disabled={path !== "/"}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle className="text-3xl font-semibold mb-5">
                  Edit Task
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
                  <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={task.title}
                  />
                  <Input
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={task.description}
                  />
                  <Button>Confirm</Button>
                </form>
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <Button
            className="bg-green-600 hover:bg-green-600/80"
            onClick={handleSetAsComplete}
            disabled={is_completed}
          >
            Mark as complete
          </Button>
        </CardContent>
      </Card>
    );
  } else if (path === "/complete") {
    if (is_completed) {
      content = (
        <Card className="max-w-[800px] shadow-lg">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col gap-5">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button disabled={path !== "/"}>Edit</Button>
            <Button
              className="bg-green-600 hover:bg-green-600/80"
              onClick={handleSetAsComplete}
              disabled={is_completed}
            >
              Mark as complete
            </Button>
          </CardContent>
        </Card>
      );
    } else {
      content = <div>Please add some Task to Completed</div>;
    }
  }

  return <>{content}</>;
};

export default TodoCard;
