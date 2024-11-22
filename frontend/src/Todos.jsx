import React from "react"
import TodoList from "./todoList";

export default function Todos() {
  return (
    <div className="flex justify-center flex-wrap ">
      <TodoList />
      <TodoList />
    </div>
  );
}
