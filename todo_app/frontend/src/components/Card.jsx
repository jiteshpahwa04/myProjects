import { useEffect, useState } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import { HiPencilSquare } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function Card({ task, taskList, deleteTask, editTask }) {
  const [completedList, setCompletedList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [status, setStatus] = useState(task.status);
//   const [changed, setChanged] = useState(true);

  async function handleStatus() {
    // toggle the status in pending and completed
    try {
      const res = await fetch(
        // `http://localhost:5000/api/v1/getAllTasks`,
        `${process.env.REACT_APP_BASE_URL}/UpdateStatus/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskName: task.taskName,
            status: (status==="completed")?"pending":"completed"
          }),
        }
      );
      // const newList = taskList;
      // newList.push(task);
      // console.log(task);
    } catch (err) {
      console.error(err);
      console.log(err);
      toast.error("Something Went Wrong");
    }
    // setStatus(taskList[index].status);
    let index = taskList.findIndex((obj) => obj.taskName === task.taskName);
    // console.log(index);
    if (status === "completed") {
      setStatus("pending");
      taskList[index].status = "pending";
      toast.success("Task Added Again");
    } else {
      setStatus("completed");
      taskList[index].status = "completed";
      toast.success("Task Completed");
    }
  }

  async function getCompletedTasks() {
    setCompletedList(taskList.filter((task) => task.status === "completed"));
  }

  async function getPendingTasks() {
    setPendingList(taskList.filter((task) => task.status === "pending"));
  }

  useEffect(() => {
    getCompletedTasks();
    getPendingTasks();
  }, [status]);

  return (
    <div>
      <div className="lg:text-xl md:text-xl w-full py-2 text-lg">
        <div className={"card-container grid grid-cols-2 gap-5 bg-slate-100 py-5 px-10 rounded-2xl justify-around border-2 " + (task.urgency==="Low"? "border-green-500" : task.urgency==="Medium"? ' border-yellow-500' : task.urgency==="High"? 'border-red-500' : "border-gray-500")}
        >
          <div className="flex flex-col items-center justify-center overflow-auto">
            <div>{task.taskName}</div>
            {/* <div>{task.urgency}</div> */}
            <div className="text-sm">{task.date}</div>
          </div>
          <div className="flex items-center justify-center gap-5">
            {status === "pending" ? (
              <MdOutlineDoneOutline
                size="20px"
                color="green"
                onClick={handleStatus}
                className="cursor-pointer"
              />
            ) : (
              <VscDebugRestart
                size="20px"
                color="blue"
                onClick={handleStatus}
                className="cursor-pointer"
              />
            )}
            <AiFillDelete
              color="red"
              size="20px"
              onClick={() => {
                deleteTask(task);
              }}
              className="cursor-pointer"
            />
            <HiPencilSquare
              color="blue"
              size="20px"
              onClick={()=>{
                editTask(task);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
