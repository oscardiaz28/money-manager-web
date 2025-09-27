import { axiosConfig } from "../utils/axios"

export const dashboardData = async () => {
    const resp = await axiosConfig.get("/dashboard")
    return resp.data
}