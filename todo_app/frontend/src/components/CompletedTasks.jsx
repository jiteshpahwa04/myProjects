import React, { useState, useEffect } from 'react';
import {VscDebugRestart} from "react-icons/vsc";
import {AiFillDelete} from "react-icons/ai";
import Card from './Card';

function CompletedTasks({taskList, deleteTask, editTask, sort}) {

  const [completedList, setCompletedList] = useState([]);

  async function getCompletedTasks(){
    if(sort==="highToLow"){
      let hTasks = taskList.filter((task)=>task.urgency==="High");
      let mTasks = taskList.filter((task)=>task.urgency==="Medium");
      let lTasks = taskList.filter((task)=>task.urgency==="Low");
      let nTasks = taskList.filter((task)=>task.urgency==="");
      let dList = [...hTasks,...mTasks,...lTasks,...nTasks];
      setCompletedList(dList.filter((task)=>task.status==="completed"));
    }else if(sort==="lowToHigh"){
      let hTasks = taskList.filter((task)=>task.urgency==="High");
      let mTasks = taskList.filter((task)=>task.urgency==="Medium");
      let lTasks = taskList.filter((task)=>task.urgency==="Low");
      let nTasks = taskList.filter((task)=>task.urgency==="");
      let dList = [...nTasks, ...lTasks, ...mTasks, ...hTasks];
      setCompletedList(dList.filter((task)=>task.status==="completed"));
    }else{
      setCompletedList(taskList.filter((task)=>task.status==="completed"));
    }
  }

  useEffect(()=>{
    getCompletedTasks();
  },[]);

  return (
    <div>
    {
        taskList.length > 0 ? 
        (
        <div>
            {
            completedList.map((task,i)=>(
              <Card task={task} taskList={taskList} deleteTask={deleteTask} editTask={editTask} key={i}/>
            ))
            }
        </div>
        ) :
        (<div className='w-full mx-auto'>
            YOU HAVE NO ADDED ANY TASK
        </div>)
    }
    </div>
  )
}

export default CompletedTasks;