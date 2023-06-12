import { createSlice } from "@reduxjs/toolkit";


export const TotalMoneySlice = createSlice({
    name: "totalMoney",
    initialState: 0,
    reducers:{
        setTotal: (state, action)=>(
            state = action.payload
        ),
        addTotal: (state, action)=>(
            state += action.payload
        ),
        subtractTotal: (state, action)=>(
            state -= action.payload
        )
    }
});

export const {setTotal, addTotal, subtractTotal} = TotalMoneySlice.actions;
export default TotalMoneySlice.reducer;