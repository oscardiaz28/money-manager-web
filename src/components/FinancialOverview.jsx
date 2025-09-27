import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const colors = ["#451575", "#054920", "#8D0F13"]


export const FinancialOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Balance Total", amount: totalBalance },
        { name: "Total Ingresos", amount: totalIncome },
        { name: "Total Gastos", amount: totalExpense },
    ]

    return (
        <div className='bg-white shadow-md p-6 rounded-lg border-1 border-gray-200/50'>

            <div className='flex items-center justify-between mb-6'>
                <h4 className='text-md font-medium'>Financial Overview</h4>
            </div>

            <div className='relative'>

                <div className='absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <p className="text-gray-600 text-xs">Balance Total</p>
                    <p className='text-lg md:text-2xl font-medium'>S/ {totalBalance}</p>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={balanceData}
                            dataKey="amount"
                            nameKey="name"
                            innerRadius={80}
                            className='stroke-0'
                        >
                            {balanceData.map((_entry, index) => (
                                <Cell key={index} fill={colors[index]} className="cursor-pointer" />
                            ))}
                        </Pie>

                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const { name, value } = payload[0]
                                    return (
                                        <div className="bg-white/40 backdrop-blur-3xl flex items-center justify-between gap-6 px-3 py-1 rounded-[8px] 
                                    text-xs border-1 border-gray-200">
                                            <p>{name}</p>
                                            <p>{value}</p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className='flex items-center justify-center gap-6 gap-x-5 flex-wrap'>
                {balanceData.map((item, idx) => {
                    return (
                        <div key={item.name} className='flex items-center justify-between text-xs gap-2'>
                            <div className='flex items-center gap-2'>
                                <div className='size-3 rounded-full' style={{ background: colors[idx] }}></div>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
