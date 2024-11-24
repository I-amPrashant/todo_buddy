import React, {useState, useEffect} from "react"
import TodoList from "./todoList";
import axios from "axios";

export default function Todos({addTaskClick, filter}) {
  const [todos, setTodos] = useState([]);
  const [deleteTaskClick, setDeleteTaskClick] = useState(false);

    useEffect(()=>{
      axios.get(`http://localhost:5000/allTasks/${filter!=='all'?`${filter}`:''}`)
      .then(res=>{
        setTodos(res.data.allTasks);
        
      }).catch(error=>{
        console.log('error: ', error.message);
      })
    }, [addTaskClick, deleteTaskClick, filter]);


  return (
    <div className="flex justify-center flex-wrap ">
      {todos?.map((todo, index)=>{
        return <TodoList todo={todo} key={index} taskId={todo._id} setDeleteTaskClick={setDeleteTaskClick} />
      })}
    </div>
  );
}
