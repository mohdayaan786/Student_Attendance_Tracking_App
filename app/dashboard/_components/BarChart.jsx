"use client"; // Ensure it runs only on the client side

import { getUniqueRecords } from "@/app/_services/service";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartComponent({ attendanceList, totalPresentData }) {
    const [data, setData] = useState([]);
    const [client, setClient] = useState(false); // Ensure client-side rendering

    useEffect(() => {
        setClient(true); // Mark as client-rendered
        formatAttendanceListCount();
    }, [attendanceList, totalPresentData]);

    const formatAttendanceListCount = () => {
        if (!attendanceList || !totalPresentData) return;

        const totalStudent = getUniqueRecords(attendanceList);
        const result = totalPresentData.map(item => ({
            day: item.day,
            presentCount: item.presentCount,
            absentCount: Number(totalStudent?.length) - Number(item.presentCount),
        }));

        console.log("✅ Processed Data:", result);
        setData(result);
    };

    if (!client) return null; // Prevent SSR rendering

    return (
        <div className="p-5 border rounded-lg shadow-sm">
            <h2 className="font-bold text-lg my-2">Attendance Chart</h2>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presentCount" name="Total Present" fill="#4c8cf8" />
                    <Bar dataKey="absentCount" name="Total Absent" fill="#1fe6d1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartComponent;
