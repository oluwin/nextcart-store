'use client'

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF']

export function PieChart({
                             data,
                             nameKey,
                             valueKey,
                             className = 'h-[300px] w-full'
                         }: {
    data: any[]
    nameKey: string
    valueKey: string
    className?: string
}) {
    if (!data || data.length === 0) {
        return (
            <div className={className + " flex items-center justify-center text-muted-foreground"}>
                No data available
            </div>
        )
    }

    return (
        <div className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey={valueKey}
                        nameKey={nameKey}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #eee',
                            borderRadius: '4px',
                            padding: '8px'
                        }}
                    />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    )
}