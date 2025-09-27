import { create } from "zustand"
import { axiosConfig } from "../utils/axios"

export const useCategoryStore = create( (set, get) => ({
    categories: [],
    isFetching: true,
    isAdding: false,
    isEditing: false,

    fetchCategories: async () => {
        set({isFetching: true})
        try{
            const resp = await axiosConfig.get("/categories")
            set({categories: resp.data})
        }catch(err){
            throw err
        }finally{
            set({isFetching: false})
        }
    },

    addCategory: async (data) => {
        set({isAdding: true})
        const {categories} = get()
        try{
            const resp = await axiosConfig.post("/categories", data) 
            set({categories: [...categories, resp.data]})
        }catch(err){
            throw err
        }finally{
            set({isAdding: false})
        }
    },

    updateCategory: async (id, data) => {
        set({isEditing: true})
        const {categories} = get()
        try{
            const resp = await axiosConfig.put(`/categories/${id}`, data)
            const newList = categories.map( c => {
                if( c.id == id ) return resp.data
                else return c
            })
            set({categories: newList})
        }catch(err){
            throw err
        }finally{
            set({isEditing: false})
        }
    },

    fetchIncomeCategories: async () => {
        try{
            const resp = await axiosConfig.get("/categories/income")
            return resp.data
        }catch(err){
            throw err
        }
    },

    fetchExpenseCategories: async () => {
        try{
            const resp = await axiosConfig.get("/categories/expense")
            return resp.data
        }catch(err){
            throw err
        }
    }

}))