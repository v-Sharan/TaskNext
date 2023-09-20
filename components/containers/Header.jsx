"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { createTodo } from "@/lib/actions/todoActions";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Header = () => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [buy, setBuy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const path = usePathname();
  const router = useRouter();

  const handleChange = ({ target }) => {
    setTask((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      toast({
        title: "Input fields must not be empty",
        action: (
          <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
        ),
      });
    }
    setBuy(true);
    await createTodo({ ...task, path });
    toast({
      title: "Task Added successfully",
      action: (
        <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
      ),
    });
    setOpen(false);
    setBuy(false);
  };

  return (
    <div className="py-10 px-20">
      <h1 className="text-3xl font-bold mb-5">Todo List App</h1>
      <div className="flex gap-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button disabled={path !== "/"}>Add New Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold mb-5">
                Add New Task
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <form className="flex flex-col gap-5" onSubmit={handleCreateTask}>
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                />
                <Button>
                  {buy ? (
                    <Loader2
                      color="#fff"
                      className="mr-2 h-5 w-5 animate-spin"
                    />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </form>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Button
          className="bg-yellow-500 hover:bg-yellow-500/90"
          onClick={() => {
            if (path === "/") router.push("/complete");
            if (path !== "/") router.push("/");
          }}
        >
          {path === "/" ? "View Complete Task" : "Go Back"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
