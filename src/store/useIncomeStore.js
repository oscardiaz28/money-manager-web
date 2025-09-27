import { create } from "zustand";
import { axiosConfig } from "../utils/axios";
import dayjs from "dayjs";
import axios from "axios";


export const useIncomeStore = create( (set, get) => ({
    incomes: [],
    chartData: [],
    isFetchIncomes: true,
    isAdding: false,
    isDeleting: false,
    isGettingChartData: true,

    fetchIncomes: async () => {
        set({isFetchIncomes: true})
        try{
            const resp = await axiosConfig.get("/incomes")
            set({incomes: resp.data})
        }catch(err){
            throw err
        }finally{
            set({isFetchIncomes: false})
        }
    },

    addIncome: async (data) => {
        set({isAdding: true})
        const {incomes} = get()
        try{   
            const resp = await axiosConfig.post("/incomes", data)
            set({incomes: [...incomes, resp.data]})
            await get().getChartData()
        }catch(err){
            throw err
        }finally{
            set({isAdding: false})
        }
    },

    deleteIncome: async (id) => {
        set({isDeleting: true})
        const {incomes} = get()
        try{
            await axiosConfig.delete(`/incomes/${id}`)
            const arr = incomes.filter( i => i.id != id )
            set({incomes: arr})
            await get().getChartData()
        }catch(err){
            throw err
        }finally{
            set({isDeleting: false})
        }
    },

    getChartData: async () => {
        set({isGettingChartData: true})
        try{
            const resp = await axiosConfig.get("/incomes/chart")
            const formatted = resp.data.map( item => ({ 
                date: dayjs(item.date).format("DD MMM"),
                total: item.value
              }) )
            set({chartData: formatted})
        }catch(err){
            throw err
        }finally{
            set({isGettingChartData: false})
        }
    },

    downloadExcel: async () => {
        try{    
            const options = {responseType : "blob"}
            const resp = await axiosConfig.get("/incomes/excel", options)
            return resp.data
        }catch(err){
            throw err
        }
    }
    
}))