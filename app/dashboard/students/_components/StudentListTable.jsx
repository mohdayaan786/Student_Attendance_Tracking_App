import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Global_api from "@/app/_services/Global_api";
import { toast } from "sonner";



function StudentListTable({ StudentList, refreshData }) {
    const CustomButtons = (props) => {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <span className="inline-flex">
                        <Button className="bg-rose-500 hover:bg-rose-800"><Trash /></Button>
                    </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your records
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => DeleteRecord(props?.data?.id)} className="bg-blue-700 hover:bg-blue-800 text-white">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };


    const colDefs = useMemo(() => [
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "address", filter: true },
        { field: "contact", filter: true },
        {field: "grade", filter: true},
        {
            field: "action",
            cellRenderer: CustomButtons,
            filter: false,
            suppressColumnsToolPanel: true,
            suppressHeaderMenuButton: true
        },
    ], []);

    const [rowData, setRowData] = useState(StudentList || []);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (StudentList && StudentList.length > 0) {
            const filteredData = searchInput.trim()
                ? StudentList.filter(student => {
                    // Search across all string fields
                    return Object.entries(student).some(([key, value]) => {
                        // Skip action column and non-string fields
                        if (key === 'action' || typeof value !== 'string') return false;

                        return value.toLowerCase().includes(searchInput.toLowerCase());
                    });
                })
                : StudentList;
            setRowData(filteredData);
        }
    }, [StudentList, searchInput]);

    const DeleteRecord = (id) => {
        Global_api.DeleteStudent(id).then(resp => {
            if (resp) {
                toast("Student Deleted Successfully!");
                refreshData();
            }
        })
    }

    return (
        <div>
            <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
                <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
                    <Search />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="outline-none w-full"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>

                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50, 100]}
                />
            </div>
        </div>
    );
}

export default StudentListTable;