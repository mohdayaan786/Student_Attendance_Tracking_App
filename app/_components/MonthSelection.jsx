"use client";
import React, { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";

function MonthSelection({ selectedMonth, setSelectedMonth }) { // ✅ Accept setSelectedMonth as a prop
    const today = new Date();
    const [month, setMonth] = useState(addMonths(today, 0)); // Default to current month

    const handleMonthChange = (value) => {
        if (value) {
            setMonth(value);
            setSelectedMonth(value); // ✅ Correct: This updates the state in `Dashboard.js`
            console.log("🟢 Month selected:", moment(value).format("MM/YYYY")); // Debug log
        }
    };

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex gap-2 items-center text-slate-500">
                        <CalendarDays className="h-5 w-5" />
                        {moment(month).format("MMMM YYYY")}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={month}
                        onSelect={handleMonthChange} // ✅ Fix: onSelect updates state
                        className="flex flex-1 justify-center"
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}


export default MonthSelection;
