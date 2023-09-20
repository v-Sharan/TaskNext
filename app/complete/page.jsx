import TodoCard from "@/components/containers/TodoCard";
import { GetAllTodo } from "@/lib/actions/todoActions";
import React from "react";

const page = async () => {
  const { Task } = await GetAllTodo();
  return (
    <div className="flex px-32 flex-col gap-10">
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
        <h1>Add some Task to complete to see here</h1>
      )}
    </div>
  );
};

export default page;
