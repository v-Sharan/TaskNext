import React from "react";
import { GetAllTodo } from "@/lib/actions/todoActions";
import TodoCard from "@/components/containers/TodoCard";

const Page = async () => {
  const { Task } = await GetAllTodo();
  return (
    <div className="px-32 flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        {Task.length != 0 ? (
          Task.map((item) => (
            <TodoCard
              key={item._doc?._id.toString()}
              _id={item._doc?._id.toString()}
              title={item._doc.title}
              description={item._doc.description}
              is_completed={item._doc.is_completed}
            />
          ))
        ) : (
          <h1>There are No Tasks, Add some :)</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
