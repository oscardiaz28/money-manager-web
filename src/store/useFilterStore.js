import { create } from "zustand";
import { axiosConfig } from "../utils/axios";

export const useFilterStore = create((set, get) => ({
    loading: false,
    transactions: [],
    type: "income",

    getTransactions: async (params, type) => {
        set({loading: true})
        try{
            const resp = await axiosConfig.post("/filters", params)
            set({transactions: resp.data})
            set({type: type})
            return resp.data
        }catch(err){
            throw err
        }finally{
            set({loading: false})
        }
    }
}))