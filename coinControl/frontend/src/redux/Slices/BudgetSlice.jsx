import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

// async function getTotalBudget(){

//     const [totalBudget, setTotalBudget] = useState(0);

    // try{
    //     const res = await fetch(
    //         `${process.env.REACT_APP_BASE_URL}/getTotalBudget`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //     );
    //     const data = await res.json();
    //     console.log(data.data[0].value);
    //     setTotalBudget(data.data[0].value);
    // }catch(err){
    //     console.log("Error is: ",err);
    // }
// }

export const BudgetSlice = createSlice({
    name: "budget",
    initialState: 0,
    reducers:{
        setBudget: (state, action)=>(
            state = action.payload
        )
    }
});

export const {setBudget} = BudgetSlice.actions;
export default BudgetSlice.reducer;