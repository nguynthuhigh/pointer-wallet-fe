import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const CustomerChartGrow = () => {
    const cusData = [
        {
            name: "6d ago", user: 30
        },
        {
            name: "5d ago", user: 40
        },
        {
            name: "4d ago", user: 10
        },
        {
            name: "3d ago", user: 12
        },
        {
            name: "2d ago", user: 19
        },
        {
            name: "1d ago", user: 26
        },
        {
            name: "today", user: 7
        }
    ];
    return (
        <>
            <div className="h-80 bg-gray-800 border-[1px] border-gray-700 rounded-[6px] px-5 py-4" >
                <p className="text-2xl font-medium text-blue-500">Customer Grow</p>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <LineChart
                        data={cusData}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey={'name'}  stroke='#9CA3AF'/>
                        <YAxis stroke='#9CA3AF'/>
                        <Tooltip />
                        <Line
                            type='monotone'
                            dataKey="user"
                            stroke="#6366F1"
                            dot= {{fill: '#6366F1' , strokeWidth:2 ,r:5}}
                            activeDot= {{r:8 ,strokeWidth: 2}}
                        />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}