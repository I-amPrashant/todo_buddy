import React, {useState, useRef} from 'react'
import { Tilt } from '@jdion/tilt-react'
import {gsap} from 'gsap'


export default function TodoList() {
const [click, setClick] = useState(false);
const lineRef=useRef(null);
const boxRef=useRef(null);

const handleClick=()=>{
    setClick(!click);
    const timeline=gsap.timeline();

    timeline.to(lineRef.current, {
        width:'100%',
        duration:'.3',
        ease:'power4.out',
    })
    timeline.to(boxRef.current, {
        opacity:'0',
        duration:'1',
        ease:'power1.out',
        onComplete:()=>{
            boxRef.current.style.display='none';
        }
    })
}

  return (
    <div ref={boxRef} onClick={handleClick} className="px-4 py-4 md:px-3 cursor-pointer w-full sm:w-1/2  md:w-[33.33%] xl:w-[25%]">
    <Tilt className="bg-white rounded-lg overflow-hidden relative">

        {/* task importance indicator  */}
      <h1 className=" py-3 text-center bg-green-500  font-bold text-lg">
        Important
      </h1>

      {/* task name   */}
      <h2 className="text-gray-500 font-semibold mt-2 px-3 py-4 text-start">
        Lorem ipsum dolor sit amet consectetur adipisicing .
      </h2>
   
      {/* task deadline  */}
      <h4 className="text-start text-gray-400 text-sm px-3 pt-2">
        <span className="font-semibold text-gray-500">Deadline</span>:
        2024/11/12
      </h4>

      {/* task editor  */}
      <div className='flex flex-wrap gap-3 my-5 px-3 '>
        <button className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg'>update</button>
        <button className='px-4 py-2 bg-red-600 text-white font-semibold rounded-lg'>delete</button>

      </div>
      

      {/* check mark  */}
      <div className="absolute bottom-5 right-3">
        <button className=" mt-4 rounded-full h-6 w-6 justify-center items-center border-2  border-gray-500  text-green-400">
          <i className={`fa-solid fa-${click?'check':'uncheck'}`}></i>
        </button>
      </div>

      {/* cross mark after click */}
    <div ref={lineRef} className='w-0 absolute top-1/2 left-0 h-[1px] bg-gray-600'>

    </div>

    </Tilt>
  </div>
  )
}