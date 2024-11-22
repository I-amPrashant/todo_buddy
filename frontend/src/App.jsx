import React, { useState } from "react";
import Todo from "./Todos";
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

      {/* filter todos  */}
      <div className="border-y-[1px] border-black border-opacity-50 py-3 mt-10 flex justify-start gap-3 px-3 flex-wrap">
        <button className="outline-none bg-[#dddcdc] rounded-lg px-4 py-1 font-semibold">
          All
        </button>
        <button className="outline-none bg-[#dddcdc] rounded-lg px-4 py-1 font-semibold">
          Incomplete
        </button>
        <button className="outline-none bg-[#dddcdc] rounded-lg px-4 py-1 font-semibold">
          Completed
        </button>
      </div>

      {/* todos  */}
      <div className="mt-10  px-5 md:px-8">
        <Todos/>
      </div>
    </div>
  );
}
