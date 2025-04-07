"use client"
import { useTheme } from "next-themes"
import React from 'react'
import { useEffect } from "react"


function Dashboard() {
    const { setTheme } = useTheme()

    useEffect(() => {
        setTheme('light')
    }, [setTheme])
  return (
    <div>
      page
    </div>
  )
}

export default Dashboard
