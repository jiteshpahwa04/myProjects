import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import AllTasks from "../components/AllTasks";
import PendingTasks from "../components/PendingTasks";
import CompletedTasks from "../components/CompletedTasks";
import PlannedTasks from "../components/PlannedTasks";
import { toast } from "react-hot-toast";
import { AiOutlineCalendar } from "react-icons/ai";
import {BsExclamationLg} from "react-icons/bs";
import "./Task.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addToTasks } from "../redux/Slices/TaskSlice";

function Tasks() {
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const [taskTab, setTaskTab] = useState("1");
  
  const [urgency, setUrgency] = useState("");
  const [urgencyColor, setUrgencyColor] = useState("grey");

  const [date, setDate] = useState(null);
  const [planDate, setPlanDate] = useState("");

  const [sort, setSort] = useState("");

  async function deleteTask(task) {
    // delete the task
    console.log(task);
    // api use krke delete krenge
    try {
      const res = await fetch(

        `${process.env.REACT_APP_BASE_URL}/deleteController/${task._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(task._id);
      fetchAllTasks();
      toast.success("Task Deleted");
    } catch (err) {
      toast.error("Something Went Wrong");
      console.error(err);
      console.log(err);
    }
  }

  async function fetchAllTasks() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getAllTasks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      const tasks = data.tasks;
      for(var i=0;i<tasks.length;i++){
        dispatch(addToTasks(tasks[i]))
      }
      setTaskList(tasks);
    } catch (err) {
      console.error(err);
      console.log(err);
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  }

  async function createTask() {
    let task = document.getElementById("create-task").value.trim();
    console.log(task);
    try {
      if (task.length <= 0) {
        console.log("Not gonna add");
        throw "Task Empty";
      }
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/CreateController`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskName: task,
            urgency: urgency,
            date: planDate,
          }),
        }
      );

      document.getElementById("create-task").value = "";
      setUrgency("");
      setUrgencyColor("grey");
      setDate(null);
      setPlanDate("");

      console.log(urgency, planDate);
      fetchAllTasks();
      toast.success("Task Added");
    } catch (err) {
      console.log(err);
      if (err === "Task Empty") {
        toast.error(err);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  }

  async function editTask(task){
    console.log(task);
    document.getElementById("create-task").value = task.taskName;
    
    if(task.urgency===""){
      setUrgency("");
      setUrgencyColor("gray");
    }else if(task.urgency==="Low"){
      setUrgency("Low");
      setUrgencyColor("green");
    }else if(task.urgency==="Medium"){
      setUrgency("Medium");
      setUrgencyColor("d97706");
    }else{
      setUrgency("High");
      setUrgencyColor("red");
    }

    setPlanDate(task.date);

    deleteTask(task);
  }

  async function handleUrgency(event){
    if(urgency===""){
      setUrgency("Low");
      setUrgencyColor("green");
    }else if(urgency==="Low"){
      setUrgency("Medium");
      setUrgencyColor("#d97706");
    }else if(urgency==="Medium"){
      setUrgency("High");
      setUrgencyColor("red");
    }else{
      setUrgency("");
      setUrgencyColor("grey");
    }
  }

  useEffect(() => {
    fetchAllTasks();
  }, [taskTab]);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div>
        <div className="w-3/5 mx-auto flex gap-5 flex-col justify-around">
          <button
            className="px-12 py-3 border-2 border-blue-400 rounded-lg text-2xl font-bold"
            onClick={() => {
              setTaskTab("1");
            }}
          >
            All Tasks
          </button>
          <button
            className="px-12 py-3 border-2 border-blue-400 rounded-lg text-2xl font-bold"
            onClick={() => {
              setTaskTab("2");
            }}
          >
            Pending Tasks
          </button>
          <button
            className="px-12 py-3 border-2 border-blue-400 rounded-lg text-2xl font-bold"
            onClick={() => {
              setTaskTab("3");
            }}
          >
            Completed Tasks
          </button>
          <button
            className="px-12 py-3 border-2 border-blue-400 rounded-lg text-2xl font-bold"
            onClick={() => {
              setTaskTab("4");
            }}
          >
            Planned Tasks
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="w-full flex items-center gap-0 input-container">
          <input
            type="text"
            name=""
            id="create-task"
            className="w-full p-4 rounded-xl text-gray-700 text-2xl outline-0"
            placeholder="Add a New Task"
            onKeyDown={(e) => {
              e.key === "Enter" ? createTask() : console.log();
            }}
          />
          <div>
            <BsExclamationLg 
            className="add-icon"
            size="40px"
            color={urgencyColor}
            title="Urgency"
            onClick={handleUrgency}/>
          </div>
          <div className="flex justify-center items-center">
          <DatePicker
            showIcon
            selected={date}
            onChange={(fullDate) => {
              console.log(fullDate);
              var date = fullDate.getDate();
              var month = fullDate.getMonth();
              var year = fullDate.getFullYear();
              var finalDate = date + "/" + month + "/" + year;
              setDate(fullDate);
              setPlanDate(finalDate);
            }}
            className="w-[10px] DatePicker"
            title="Plan for a Date"
          />  
          </div>
        </div>

        <div>
          {loading ? (
            <Spinner />
          ) : taskTab === "1" ? (
            <AllTasks taskList={taskList} deleteTask={deleteTask} editTask={editTask} sort={sort}/>
          ) : taskTab === "2" ? (
            <PendingTasks taskList={taskList} deleteTask={deleteTask} editTask={editTask} sort={sort}/>
          ) : taskTab === "3" ? (
            <CompletedTasks taskList={taskList} deleteTask={deleteTask} editTask={editTask} sort={sort}/>
          ) : taskTab === "4" ? (
            <PlannedTasks taskList={taskList} deleteTask={deleteTask} editTask={editTask} sort={sort}/>
          ) : (
            <div>There is some error. Sorry for inconvinience</div>
          )}
        </div>
      </div>

      <div>
        <div className="w-3/5 mx-auto flex gap-5 flex-col justify-around">
          <button
            className="px-12 py-3 border-2 border-red-500 rounded-lg text-2xl font-bold"
            onClick={()=>{
              let hTasks = taskList.filter((task)=>task.urgency==="High");
              let mTasks = taskList.filter((task)=>task.urgency==="Medium");
              let lTasks = taskList.filter((task)=>task.urgency==="Low");
              let nTasks = taskList.filter((task)=>task.urgency==="");
              let dList = [...hTasks,...mTasks,...lTasks,...nTasks];
              setTaskList(dList);
              setSort("highToLow");
              console.log(taskList);
            }}
          >
            High to Low
          </button>
          <button
            className="px-12 py-3 border-2 border-green-500 rounded-lg text-2xl font-bold"
            onClick={() => {
              let hTasks = taskList.filter((task)=>task.urgency==="High");
              let mTasks = taskList.filter((task)=>task.urgency==="Medium");
              let lTasks = taskList.filter((task)=>task.urgency==="Low");
              let nTasks = taskList.filter((task)=>task.urgency==="");
              let dList = [...nTasks, ...lTasks, ...mTasks, ...hTasks];
              setSort("lowToHigh");
              setTaskList(dList);
            }}
          >
            Low to High
          </button>
        </div>
      </div>

    </div>
  );
}

export default Tasks;
