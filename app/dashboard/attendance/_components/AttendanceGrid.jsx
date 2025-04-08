import React, { use, useEffect } from 'react'
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment';
import Global_api from '@/app/_services/Global_api';
import { toast } from 'sonner';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function AttendanceGrid({ attendanceList, selectedMonth }) {

    const [rowData, setRowData] = React.useState();
    const [colDefs, setColDefs] = React.useState([
        { field: 'studentId', filter: true },
        { field: 'name', filter: true },
    ]);

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const noOfDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'));
    const dateArrays = Array.from({ length: noOfDays }, (_, i) => i + 1);

    useEffect(() => {
        if (attendanceList) {
            const userLists = getUniqueRecords();
            setRowData(userLists);

            dateArrays.forEach((date) => {
                setColDefs((prevData) => [...prevData, {
                    field: date.toString(), width: 50, editable: true
                }])
                userLists.forEach(obj => {
                    obj[date] = isPresent(obj.studentId, date);
                })

            })
        }
    }, [attendanceList])

    const isPresent = (studentId, day) => {
        const result = attendanceList?.find(item => item.day == day && item.studentId == studentId);
        return result ? true : false;
    }

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


    const onMarkAttendance = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format('MM/yyyy');
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date
            }
            Global_api.MarkAttendance(data).then(resp => {
                console.log(resp);
                toast("Student ID:" + studentId + " Marked as present");
            })
        }
        else {
            Global_api.MarkAbsent(studentId, day, date).then(resp => {
                console.log(resp);
                toast("Student ID:" + studentId + " Marked as absent");
            })
        }

    }
    return (
        <div>
            <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.value)}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50, 100]}
                />
            </div>

        </div>
    )
}

export default AttendanceGrid
