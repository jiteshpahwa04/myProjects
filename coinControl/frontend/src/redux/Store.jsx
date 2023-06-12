import { configureStore } from '@reduxjs/toolkit'
import BudgetSlice from './Slices/BudgetSlice'
import TotalMoneySlice from './Slices/TotalMoneySlice'
import ExpenseSlice from './Slices/ExpenseSlice'

export const store = configureStore({
  reducer: {
    budget: BudgetSlice,
    totalMoney: TotalMoneySlice,
    totalExpense: ExpenseSlice,
  },
})