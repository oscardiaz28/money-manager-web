import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    Area
} from 'recharts'

export const ExpenseOverview = ( {chartData} ) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={chartData}
                margin={{
                    top: 0, left: 0, bottom: 0, right: 0
                }}
            >
                <defs>
                    <linearGradient
                        id="colorTotal"
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={1}
                    >
                        <stop
                            offset="5%"
                            stopColor="#8A2BE2"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#8A2BE2"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <Tooltip cursor={false} formatter={(value) => `S/ ${value}`} />
                <XAxis
                    dataKey={"date"}
                    strokeWidth={0}
                    stroke="#94a3b8"
                    tickMargin={6}
                />
                <YAxis
                    strokeWidth={0}
                    stroke="#94a3b8"
                    tickMargin={6}
                />
                <Area
                    type={"linear"}
                    dataKey="total"
                    stroke="#8A2BE2"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
