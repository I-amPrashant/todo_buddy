import React, {useState, useEffect} from "react"
import TodoList from "./todoList";
import axios from "axios";

export default function Todos({addTaskClick}) {
  const [todos, setTodos] = useState([]);

    useEffect(()=>{
      axios.get('http://localhost:5000/allTasks')
      .then(res=>{
        setTodos(res.data.allTasks);
        
      }).catch(error=>{
        console.log('error: ', error.message);
      })
    }, [addTaskClick]);


  return (
    <div className="flex justify-center flex-wrap ">
      {todos?.map((todo)=>{
        return <TodoList todo={todo} key={todo._id} />
      })}
    </div>
  );
}
