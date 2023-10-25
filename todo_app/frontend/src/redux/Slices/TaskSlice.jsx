import { createSlice } from "@reduxjs/toolkit";


export const TaskSlice = createSlice({
    name: "taskList", 
    initialState: [],
    reducers:{
        addToTasks: (state, action)=>{
            state.push(action.payload);
        },
        removeFromTasks: (state, action)=>{
            return state.filter((item)=>item.id!==action.payload);
        }
    }
});

export const {addToTasks, removeFromTasks} = TaskSlice.actions;
export default TaskSlice.reducer;