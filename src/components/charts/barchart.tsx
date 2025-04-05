'use client'

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function BarChart({ data, xKey, yKey }: { data: any[], xKey: string, yKey: string }) {
    return (
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={yKey} fill="#8884d8" />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    )
}