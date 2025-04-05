'use client'

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function AreaChart({ data, xKey, yKey }: { data: any[], xKey: string, yKey: string }) {
    return (
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey={yKey} stroke="#8884d8" fill="#8884d8" />
                </RechartsAreaChart>
            </ResponsiveContainer>
        </div>
    )
}