import { createSlice } from "@reduxjs/toolkit";


export const ExpenseSlice = createSlice({
    name: "totalExpense",
    initialState: 0,
    reducers:{
        addExpense: (state, action)=>(
            state += action.payload
        ),
        removeExpense: (state, action)=>(
            state -= action.payload
        ),
        setExpense: (state, action)=>(
            state = action.payload
        )
    }
});

export const {addExpense, removeExpense, setExpense} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;