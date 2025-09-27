import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";

export const sidebarLinks = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        label: "Categorias",
        icon: List,
        path: "/category"
    },
    {
        label: "Ingresos",
        icon: Wallet,
        path: "/income"
    },
    {
        label: "Gastos",
        icon: Coins,
        path: "/expense"
    },
    {
        label: "Filtros",
        icon: FunnelPlus,
        path: "/filter"
    }
]