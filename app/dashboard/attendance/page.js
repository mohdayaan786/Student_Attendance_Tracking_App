"use client";
import GradeSelect from "@/app/_components/GradeSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import moment from "moment";
import Global_api from "@/app/_services/Global_api";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [attendanceList, setAttendanceList] = useState();

    const onSearchHandler = () => {
        const month = moment(selectedMonth).format("MM/YYYY");
        Global_api.GetAttendanceList(selectedGrade, month).then(resp => {
            setAttendanceList(resp.data);
        })
    };

    return (
        <div className="p-10">
            <h2 className="font-bold text-2xl">Attendance</h2>
            <div className="flex gap-5 my-5 p-5 border rounded-lg shadow-sm">
                <div className="flex gap-2 items-center">
                    <label>Select Month :</label>
                    <MonthSelection selectedMonth={setSelectedMonth} />
                </div>
                <div className="flex gap-2 items-center">
                    <label>Select Grade :</label>
                    <GradeSelect selectedGrade={setSelectedGrade} />
                </div>
                <Button variant="destructive" onClick={onSearchHandler}>
                    Search
                </Button>
            </div>
            <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} />
        </div>
    );
}

export default Attendance;
