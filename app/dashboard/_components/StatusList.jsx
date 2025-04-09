import moment from 'moment';
import React, { useEffect } from 'react'
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ attendanceList }) {
    const [totalStudents, setTotalStudents] = React.useState(0);
    const [presentpercentage, setPresentPercentage] = React.useState(0);

    const getUniqueRecords = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attendanceList?.forEach((record) => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
        });
        return uniqueRecord;
    }

    useEffect(() => {
        console.log("attendanceList", attendanceList);
        if (attendanceList) {
            const uniqueStudents = getUniqueRecords();
            console.log("uniqueStudents", uniqueStudents.length);
            setTotalStudents(uniqueStudents.length);

            // Calculate total days in selected month
            const totalDaysInMonth = moment().daysInMonth();

            // Count total present entries
            const presentEntries = attendanceList.filter(record => record.present).length;

            // Correct formula: (Total presents / (Total students * Total days)) * 100
            const presentpercentage = uniqueStudents.length > 0
                ? (presentEntries / (uniqueStudents.length * totalDaysInMonth)) * 100
                : 0;

            console.log("presentpercentage", presentpercentage);
            setPresentPercentage(presentpercentage);
        }
    }, [attendanceList]);


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6'>
            <Card icon={<GraduationCap className='text-blue-800' />} title="Total Students" value={totalStudents} />
            <Card icon={<TrendingUp className='text-blue-800' />} title="Total % present" value={presentpercentage.toFixed(1) + ' %'} />
            <Card icon={<TrendingDown className='text-blue-800' />} title="Total % absent" value={(100 - presentpercentage).toFixed(1) + ' %'} />
        </div>
    );
}

export default StatusList;