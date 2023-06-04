import React, { useState, useEffect } from 'react';
import Card from './Card';

function PlannedTasks({taskList, deleteTask, editTask, sort}) {

  const [plannedList, setPlannedList] = useState([]);

  async function getPlannedTasks(){
    if(sort==="highToLow"){
      let hTasks = taskList.filter((task)=>task.urgency==="High");
      let mTasks = taskList.filter((task)=>task.urgency==="Medium");
      let lTasks = taskList.filter((task)=>task.urgency==="Low");
      let nTasks = taskList.filter((task)=>task.urgency==="");
      let dList = [...hTasks,...mTasks,...lTasks,...nTasks];
      setPlannedList(dList.filter((task)=>task.date!==""));
    }else if(sort==="lowToHigh"){
      let hTasks = taskList.filter((task)=>task.urgency==="High");
      let mTasks = taskList.filter((task)=>task.urgency==="Medium");
      let lTasks = taskList.filter((task)=>task.urgency==="Low");
      let nTasks = taskList.filter((task)=>task.urgency==="");
      let dList = [...nTasks, ...lTasks, ...mTasks, ...hTasks];
      setPlannedList(dList.filter((task)=>task.date!==""));
    }else{
      setPlannedList(taskList.filter((task)=>task.date!==""));
    }
    
  }

  useEffect(()=>{
    getPlannedTasks();
  },[]);

  return (
    <div>
    {
        taskList.length > 0 ? 
        (
        <div>
            {
            plannedList.map((task,i)=>(
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

export default PlannedTasks;