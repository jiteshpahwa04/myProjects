import { createSlice } from "@reduxjs/toolkit";


export const TaskSlice = createSlice({
    // name: "cart", 
    initialState: [],
    reducers:{
        // markCompleted: (state, action)=>{
        //     state.push(action.payload);
        // },
        // markUncompleted: (state, action)=>{
        //     return state.filter((item)=>item.id!==action.payload);
        // }
    }
});

export const {markCompleted, markUncompleted} = TaskSlice.actions;
export default TaskSlice.reducer;