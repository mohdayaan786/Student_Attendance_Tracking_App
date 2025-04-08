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

function MonthSelection({ selectedMonth }) {
    const today = new Date();
    const [month, setMonth] = useState(addMonths(today, 0)); // Default to current month

    const handleMonthChange = (value) => {
        if (value) {
            setMonth(value);
            selectedMonth?.(value); // Ensure selectedMonth is correctly updated
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
                        onSelect={handleMonthChange} // Fix: Use `onSelect` instead of `onMonthChange`
                        className="flex flex-1 justify-center"
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default MonthSelection;
