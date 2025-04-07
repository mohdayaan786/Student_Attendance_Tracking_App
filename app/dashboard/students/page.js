"use client"
import React, { use, useEffect } from 'react'
import AddNewStudent from './_components/AddNewStudent'
import Global_api from '@/app/_services/Global_api'

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
        <AddNewStudent/>
      </h2>
    </div>
  )
}

export default Student
