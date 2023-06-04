import React, { useEffect, useState } from 'react'
import Card from './Card';

function PendingTasks({taskList, deleteTask, editTask, sort}) {

  const [pendingList, setPendingList] = useState([]);

  async function getPendingTasks(){
    if(sort==="highToLow"){
      let hTasks = taskList.filter((task)=>task.urgency==="High");
      let mTasks = taskList.filter((task)=>task.urgency==="Medium");
      let lTasks = taskList.filter((task)=>task.urgency==="Low");
      let nTasks = taskList.filter((task)=>task.urgency==="");
      let dList = [...hTasks,...mTasks,...lTasks,...nTasks];
      setPendingList(dList.filter((task)=>task.status==="pending"));
    }else if(sort==="lowToHigh"){
      let hTasks = taskList.filter((task)=>task.urgency==="High");
      let mTasks = taskList.filter((task)=>task.urgency==="Medium");
      let lTasks = taskList.filter((task)=>task.urgency==="Low");
      let nTasks = taskList.filter((task)=>task.urgency==="");
      let dList = [...nTasks, ...lTasks, ...mTasks, ...hTasks];
      setPendingList(dList.filter((task)=>task.status==="pending"));
    }else{
      setPendingList(taskList.filter((task)=>task.status==="pending"));
    }
  }

  useEffect(()=>{
    getPendingTasks();
  },[]);

  return (
    <div>
    {
        taskList.length > 0 ? 
        (
        <div>
            {
            pendingList.map((task,i)=>(
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

export default PendingTasks;