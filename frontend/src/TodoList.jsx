import React, { useState, useRef } from "react";
import { Tilt } from "@jdion/tilt-react";
import { gsap } from "gsap";
import axios from "axios";

export default function TodoList({ todo, taskId, setDeleteTaskClick }) {
  const [click, setClick] = useState(false);
  const lineRef = useRef(null);
  const boxRef = useRef(null);

  const handleClick = () => {
    setClick(!click);
    const timeline = gsap.timeline();

    timeline.to(lineRef.current, {
      width: "100%",
      duration: ".3",
      ease: "power4.out",
    });
    timeline.to(boxRef.current, {
      opacity: "0",
      duration: "1",
      ease: "power1.out",
      onComplete: () => {
        boxRef.current.style.display = "none";
      },
    });

    //
  };

  const handleDeleteTask=(e, id)=>{
    e.stopPropagation();
    setDeleteTaskClick(true);
    axios.delete(`http://localhost:5000/deleteTask/${id}`)
    .then(res=>{
      console.log(res.data.message);
      setDeleteTaskClick(false);
    }).catch(error=>{
      console.log('error: ', error.message);
      setDeleteTaskClick(false);
    })
  }

  const date=new Date(todo.taskDeadline).toLocaleString();

  return (
    <div
    id={taskId}
      ref={boxRef}
      onClick={handleClick}
      className="px-4 py-4 md:px-3 cursor-pointer w-full sm:w-1/2  md:w-[33.33%] xl:w-[25%]"
    >
      <Tilt className="bg-white rounded-lg overflow-hidden relative">
        {/* task importance indicator  */}
        <h1 className=" py-3 text-center bg-green-500  font-bold text-lg">
          {todo.taskImportance}
        </h1>

        {/* task name   */}
        <h2 className="text-gray-500 font-semibold mt-2 px-3 py-4 text-start">
          {todo.taskName}
        </h2>

        {/* task deadline  */}
        <h4 className="text-start text-gray-400 text-sm px-3 pt-2">
          <span className="font-semibold text-gray-500">Deadline</span>:{date}
        </h4>

        {/* task editor  */}
        <div className="flex flex-wrap gap-3 my-5 px-3 ">
          <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg" onClick={(e)=>handleDeleteTask(e, todo._id)}>
            delete
          </button>
        </div>

        {/* check mark  */}
        <div className="absolute bottom-5 right-3">
          <button className=" mt-4 rounded-full h-6 w-6 justify-center items-center border-2  border-gray-500  text-green-400">
            <i className={`fa-solid fa-${click ? "check" : "uncheck"}`}></i>
          </button>
        </div>

        {/* cross mark after click */}
        <div
          ref={lineRef}
          className="w-0 absolute top-1/2 left-0 h-[1px] bg-gray-600"
        ></div>
      </Tilt>
    </div>
  );
}
