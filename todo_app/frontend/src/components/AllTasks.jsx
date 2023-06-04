import React from 'react'
import { useEffect, useState } from "react";
import {MdOutlineDoneOutline} from "react-icons/md";
import {AiFillDelete} from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import { toast } from 'react-hot-toast';
import Card from './Card';

function AllTasks({taskList, deleteTask, editTask}) {

  return (
    <div>
    {
        taskList.length > 0 ? 
        (
            <div>
            {
                taskList.map((task, i)=>(
                    <Card task={task} taskList={taskList} deleteTask={deleteTask} editTask={editTask} key={i}/>
                ))
            }
            </div>
        ) :
        (<div className='w-full flex justify-center italic font-bold'>
            YOU HAVE NOT ADDED ANY TASK
        </div>)
    }
    </div>
  )
}

export default AllTasks;