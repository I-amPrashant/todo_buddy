import React, { useState } from "react";
import logo from "./assets/logo.png";
import Todos from "./Todos";

export default function App() {
  return (
    <div className="text-center">
      {/* logo  */}
      <div>
        <img className="mx-auto mt-2 h-32 w-32" src={logo} alt="logo" />
      </div>

      {/* header  */}
      <div>
        <h2 className="text-4xl mt-[-10px] font-semibold font-sans">
          <span className="text-red-600 font-bold">T</span>odo -{" "}
          <span className="text-red-600 font-bold">B</span>uddy
        </h2>
      </div>

      {/* adding a todo  */}
      <div className="flex gap-[2.25rem] justify-center mt-16 flex-wrap ">
        <div className="relative">
          <label htmlFor="text" className="absolute top-[-25px] left-2 z-10 font-bold">Task</label>
          <input
            type="text"
            id="text"
            placeholder="Enter a task..."
            className="outline-none border-[1px] border-black border-opacity-50 rounded-lg px-3 py-1 max-w-[250px]"
          />
        </div>

        <div className="relative">
        <label htmlFor="calendarInput" className="absolute top-[-25px] left-5 z-10 font-bold">Deadline</label>
          <input
            type="datetime-local"
            id="calendarInput"
            className="outline-none border-[1px] border-black border-opacity-50 rounded-lg px-3 py-1"
          />
        </div>
        <button className="bg-blue-500 text-white font-bold px-4 py-1 rounded-lg">
          Add Task
        </button>
      </div>

      {/* filter todos  */}
      <div className="border-y-[1px] border-black border-opacity-40 py-3 mt-6 flex justify-start gap-3 px-3 flex-wrap">
        <button className="outline-none bg-[#242424] text-white rounded-lg px-4 py-1 font-semibold">
          All
        </button>
        <button className="outline-none bg-sky-600 text-white rounded-lg px-4 py-1 font-semibold">
          Incomplete
        </button>
        <button className="outline-none bg-green-500 text-white rounded-lg px-4 py-1 font-semibold">
          Completed
        </button>
      </div>

      {/* todos  */}
      <div className="mt-7  px-5 md:px-8">
        <Todos />
      </div>
    </div>
  );
}
