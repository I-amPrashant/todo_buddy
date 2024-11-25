import React, { useState, useContext, useEffect } from "react";
import logo from "./assets/logo.png";
import Todos from "./Todos";
import axios from "axios";
import { GlobalContext } from "./context/GlobalContext";

export default function App() {
  const [addTaskClick, setAddTaskClick] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [submitClick, setSubmitClick] = useState(false);
  const [email, setEmail] = useState("");

  const {
    taskName,
    setTaskName,
    taskDeadline,
    setTaskDeadline,
    taskImportance,
    setTaskImportance,
    updateClick,
    taskId,
  } = useContext(GlobalContext);

  const task = {
    taskImportance: taskImportance,
    taskName: taskName,
    taskDeadline: taskDeadline,
  };
  const handleTaskAdd = () => {
    if (!taskName || !taskDeadline || !taskImportance) {
      return alert("all fields are required");
    }
    setAddTaskClick(true);

    if (!updateClick) {
      axios
        .post("http://localhost:5000/newTask", { task })

        .then((res) => {
          console.log(res.data.message);
          setAddTaskClick(false);
          setTaskName("");
          setTaskDeadline("");
          setTaskImportance("");
        })
        .catch((error) => {
          console.log(error.message);
          setAddTaskClick(false);
          setTaskName("");
          setTaskDeadline("");
          setTaskImportance("");
        });
    } else {
      axios
        .put(`http://localhost:5000/updateTask/${taskId}`, { task })
        .then((res) => {
          console.log(res.data.message);
          setAddTaskClick(false);
          setTaskName("");
          setTaskDeadline("");
          setTaskImportance("");
        })
        .catch((error) => {
          console.log(error.message);
          setAddTaskClick(false);
          setTaskName("");
          setTaskDeadline("");
          setTaskImportance("");
        });
    }
  };

  const mailOptions={
    from:'airmax50cent@gmail.com',
    to:email,
    subject:'registering email',
    text: "your email has been registered", // plain text body
}

  useEffect(() => {
    if(!email){
      return setOpenModal(false);
    }

    //to prevent initial render
    if(submitClick){
      axios
        .post("http://localhost:5000/registerEmail", {mailOptions})
        .then((res) => {
          console.log(res.data.info);
          setSubmitClick(false);
          setOpenModal(false);
        })
        .catch((error) => {
          console.log(error.message);
          setSubmitClick(false);
          setOpenModal(false);
        });
    }
  }, [submitClick]);

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
          <label
            htmlFor="text"
            className="absolute top-[-25px] left-2 z-10 font-bold"
          >
            Task
          </label>
          <input
            type="text"
            id="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter a task..."
            className="outline-none border-[1px] border-black border-opacity-50 rounded-lg px-3 py-1 max-w-[250px]"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="calendarInput"
            className="absolute top-[-25px] left-5 z-10 font-bold"
          >
            Deadline
          </label>
          <input
            type="datetime-local"
            id="calendarInput"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            className="outline-none border-[1px] border-black border-opacity-50 rounded-lg px-3 py-1"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="calendarInput"
            className="absolute top-[-25px] left-5 z-10 font-bold"
          >
            Importance
          </label>
          <select
            name="importance"
            className="outline-none px-4 py-1 rounded-md cursor-pointer"
            value={taskImportance}
            onChange={(e) => setTaskImportance(e.target.value)}
          >
            <option value="">--select--</option>
            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
            <option value="later">Later</option>
          </select>
        </div>

        <button
          className={`bg-blue-500 text-white font-bold px-4 py-1 rounded-lg} `}
          onClick={() => {
            handleTaskAdd();
          }}
        >
          {updateClick ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* filter todos  */}
      <div className="border-y-[1px] border-black border-opacity-40 py-3 mt-6 flex justify-start gap-3 px-3 flex-wrap">
        <button
          className="outline-none bg-[#242424] text-white rounded-lg px-4 py-1 font-semibold"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="outline-none bg-sky-600 text-white rounded-lg px-4 py-1 font-semibold"
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
        <button
          className="outline-none bg-green-500 text-white rounded-lg px-4 py-1 font-semibold"
          onClick={() => setFilter("complete")}
        >
          Completed
        </button>
      </div>

      {/* todos  */}
      <div className="mt-7  px-5 md:px-8">
        <Todos addTaskClick={addTaskClick} filter={filter} />
      </div>

      {/* notification form popup  */}
      <div className="absolute bottom-5 right-8 p-4 border-gray-900 border-[1px] border-opacity-50 rounded-full text-2xl cursor-pointer" onClick={() => setOpenModal(true)}>
        <i className="fa-solid fa-envelope"></i>
      </div>

      {/* email registration   */}
      <div className={`absolute w-full h-full top-0 left-0 z-50 ${openModal ? "block" : "hidden"}`}>
        {/* overlay */}
        <div className="relative w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <form action="#" className="bg-white px-[40px] py-[20px] rounded-xl">
            <h1 className="font-bold text-purple-500 text-2xl mb-8">
              Email registration
            </h1>

            <div className="mb-5">
              <label htmlFor="email" className="font-semibold">
                Email:
              </label>
              <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
                type="email"
                placeholder="your email address... "
                className="ml-3 outline-none border-[1px] border-black border-opacity-50 rounded-lg px-3 py-1"
              />
            </div>

            <button type="submit" className="bg-purple-500 px-4 py-2 text-white rounded-xl" onClick={(e) => {e.preventDefault();setSubmitClick(true)}}>Submit</button>
           
          </form>
        </div>

        {/* close button */}
        <button className="absolute top-5 right-5 text-3xl text-white " onClick={() => setOpenModal(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
