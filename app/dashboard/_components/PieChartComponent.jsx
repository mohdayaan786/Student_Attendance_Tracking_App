import { getUniqueRecords } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent({ attendanceList }) {
    const data02 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ]
    const [data, setData] = React.useState([]);

    useEffect(() => {
            console.log("attendanceList", attendanceList);
            if (attendanceList) {
                const uniqueStudents = getUniqueRecords(attendanceList);
                console.log("uniqueStudents", uniqueStudents.length);
                
        
                // Calculate total days in selected month
                const totalDaysInMonth = moment().daysInMonth();
        
                // Count total present entries
                const presentEntries = attendanceList.filter(record => record.present).length;
        
                // Correct formula: (Total presents / (Total students * Total days)) * 100
                const presentpercentage = uniqueStudents.length > 0
                    ? (presentEntries / (uniqueStudents.length * totalDaysInMonth)) * 100
                    : 0;
                 
                console.log("presentpercentage", presentpercentage);

                setData([
                    { name: 'Total Present', value: Number(presentpercentage.toFixed(1)), fill: '#4c8cf8' },
                    { name: 'Total Absent', value: 100 - Number(presentpercentage.toFixed(1)), fill: '#1fe6d1' },
                ]);
            }
        }, [attendanceList]); 
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Montly attendance</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={730} height={250}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}  label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent
