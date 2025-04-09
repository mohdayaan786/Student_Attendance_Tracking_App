"use client"
import React, { use, useEffect } from 'react'
import AddNewStudent from './_components/AddNewStudent'
import Global_api from '@/app/_services/Global_api'
import StudentListTable from './_components/StudentListTable';

function Student() {

  const [studentList, setStudentList] = React.useState([]);

  useEffect(() => {
    GetAllStudents()
  }, [])

  const GetAllStudents = () => {
    Global_api.GetAllStudents().then(resp => {
      setStudentList(resp.data);
    })
  }
  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl flex justify-between items-center'>Students
        <AddNewStudent refreshData={GetAllStudents} />
      </h2>
      <StudentListTable StudentList={studentList} refreshData={GetAllStudents} />

    </div>
  )
}

export default Student
