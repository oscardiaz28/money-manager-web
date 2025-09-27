import { create } from "zustand";
import { axiosConfig } from "../utils/axios";

export const useProfileStore = create( (set, get) => ({
    user: null,
    isFetching: true,
    isSigningIn: false,
    isCreatingAccount: false,
    isCheckingAuth: false,
    activationMessage: null,

    checkAuth: async () => {
        set({isFetching: true})
        try{
            const token = localStorage.getItem("token")
            if(!token){
                throw new Error("Not token provided")
            }
            const resp = await axiosConfig.get("/profile")
            set({user: resp.data})
        }catch(err){
            console.log(err.message)
            localStorage.removeItem('token')
            set({user: null})
        }finally{
            set({isFetching: false})
        }
    },

    setUser: (data) => {
        set({user: data})
    },

    logout: () => {
        set({user: null})
    },

    login: async (data) => {
        set({isSigningIn: true})
        try{
            const resp = await axiosConfig.post("/login", data)
            const {token, user} = resp.data
            if(token){
                set({activationMessage: null})
                localStorage.setItem("token", token)
                set({user: user})
            }
        }finally{
            set({isSigningIn: false})
        }
    },

    signup: async (data) => {
        set({isCreatingAccount: true})
        try{
            await axiosConfig.post("/register", data)
        }finally{
            set({isCreatingAccount: false})
        }
    },

    resetActivationMessage: () => {
        set({activationMessage: null})
    },

    activateAccount: async (token) => {
        await axiosConfig.get(`/activate?token=${token}`)
    }


}))