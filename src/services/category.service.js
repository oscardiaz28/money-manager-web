import { axiosConfig } from "../utils/axios"

export const fetchCategories = async () => {
    const resp = await axiosConfig.get("/categories")
    return resp.data
}

export const addCategory = async (data) => {
    const resp = await axiosConfig.post("/categories", data)
    return resp.data
}

export const updateCategory = async (id, data) => {
    const resp = await axiosConfig.put(`/categories/${id}`, data)
    return resp.data
}

export const deleteCategory = async (id) => {
    const resp = await axiosConfig.delete(`/categories/${id}`)
    return resp.data
}