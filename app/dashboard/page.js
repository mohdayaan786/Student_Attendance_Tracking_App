"use client"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import MonthSelection from "../_components/MonthSelection"
import GradeSelect from "../_components/GradeSelect"
import Global_api from "../_services/Global_api"
import moment from "moment"
import StatusList from "./_components/StatusList"
import BarChart from "./_components/BarChart"
import BarChartComponent from "./_components/BarChart"
import PieChartComponent from "./_components/PieChartComponent"

function Dashboard() {
  const { setTheme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [attendanceList, setAttendanceList] = useState([])
  const [totalPresentData, setTotalPresentData] = useState([])

  useEffect(() => {
    //setTheme("light"); // Ensure this is necessary
    totalPresentCountByDay();
    getStudentAttendance();
    
    console.log("✅ Selected Grade:", selectedGrade);
    console.log("✅ Selected Month:", selectedMonth);
  }, [selectedGrade , selectedMonth]);

  const getStudentAttendance = () => {
    if (!selectedGrade || !selectedMonth) return;
    
    Global_api.GetAttendanceList(selectedGrade, moment(selectedMonth).format("MM/YYYY"))
      .then((response) => setAttendanceList(response.data))
      .catch((error) => console.error("Error fetching attendance:", error));
  };

  const totalPresentCountByDay = () => {
    if (!selectedGrade || !selectedMonth) return;
  
    const formattedDate = moment(selectedMonth).format("MM/YYYY").trim();
    const formattedGrade = selectedGrade.trim();
  
    console.log(`🔍 API Request: /api/dashboard?date=${formattedDate}&grade=${formattedGrade}`);
  
    // Swap the order of arguments to match the correct order
    Global_api.totalPresentCountByDay(formattedDate, formattedGrade)
      .then((response) => {
        setTotalPresentData(response.data);
        console.log("✅ API Response Data:", response.data);
      })
      .catch((error) => console.error("❌ API Error:", error));
  };
  
  
  

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex items-center gap-4">
        <MonthSelection selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={(grade) => setSelectedGrade(grade)} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChartComponent attendanceList={attendanceList} totalPresentData={totalPresentData} />
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>

  )
}

export default Dashboard
