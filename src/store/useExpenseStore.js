import { create } from "zustand";

export const useExpenseStore = create((set, get) => ({
    expenses: [],
    chartData: [],
    isFetchExpenses: true,
    isAdding: false,
    isDeleting: false,
    isGettingChartData: true,

    fetchExpenses: async () => {
        set({ isFetchExpenses: true })
        try {
            const resp = await axiosConfig.get("/expenses")
            set({ expenses: resp.data })
        } catch (err) {
            throw err
        } finally {
            set({ isFetchExpenses: false })
        }
    },

    addExpense: async (data) => {
        set({ isAdding: true })
        const { expenses } = get()
        try {
            const resp = await axiosConfig.post("/expenses", data)
            set({ expenses: [...expenses, resp.data] })
            await get().getChartData()
        } catch (err) {
            throw err
        } finally {
            set({ isAdding: false })
        }
    },

    deleteExpense: async (id) => {
        set({ isDeleting: true })
        const { expenses } = get()
        try {
            await axiosConfig.delete(`/expenses/${id}`)
            const arr = expenses.filter(i => i.id != id)
            set({ expenses: arr })
            await get().getChartData()
        } catch (err) {
            throw err
        } finally {
            set({ isDeleting: false })
        }
    },

    getChartData: async () => {
        set({ isGettingChartData: true })
        try {
            const resp = await axiosConfig.get("/expenses/chart")
            const formatted = resp.data.map(item => ({
                date: dayjs(item.date).format("DD MMM"),
                total: item.value
            }))
            set({ chartData: formatted })
        } catch (err) {
            throw err
        } finally {
            set({ isGettingChartData: false })
        }
    },

    downloadExcel: async () => {
        try {
            const options = { responseType: "blob" }
            const resp = await axiosConfig.get("https://money-manager-api-8igv.onrender.com/api/v1/expenses/excel", options)
            return resp.data
        } catch (err) {
            throw err
        }
    }

}))