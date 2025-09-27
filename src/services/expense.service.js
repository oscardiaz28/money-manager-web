import dayjs from "dayjs"
import { axiosConfig } from "../utils/axios"

export const addExpense = async (data) => {
    const resp = await axiosConfig.post("/expenses", data)
    return resp.data
}

export const getExpenses = async () => {
    const resp = await axiosConfig.get("/expenses")
    return resp.data
}

export const deleteExpense = async (id) => {
    const resp = await axiosConfig.delete(`/expenses/${id}`)
    return resp.data
}

export const getChartData = async () => {
    const resp = await axiosConfig.get("/expenses/chart")
    const formatted = resp.data.map( item => ({ 
        date: dayjs(item.date).format("DD MMM"),
        total: item.value
    }) )
    return formatted
}

export const downloadExpensesExcel = async () => {
    const options = {responseType : "blob"}
    const resp = await axiosConfig.get("/expenses/excel", options)
    return resp.data
}