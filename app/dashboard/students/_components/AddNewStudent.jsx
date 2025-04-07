'use client';
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Global_api from '@/app/_services/Global_api';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';

function AddNewStudent() {
    const [open, setOpen] = React.useState(false);
    const [grades, setGrades] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        GetAllGradeList();
    }, [])

    const GetAllGradeList = () => {
        Global_api.GetAllGrades().then(resp => {
            setGrades(resp.data);
        })
    }

    const onSubmit = (data) => {
        setLoading(true);
        Global_api.CreateNewStudent(data).then(resp => {
            console.log("--", resp);
            if (resp.data) {
                reset();
                setOpen(false);
                toast("Student Added Successfully!");
            }
            setLoading(false);
        })
    };

    return (
        <div>
            <Button variant="destructive" onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>

                    {/* ✅ Moved form outside of DialogDescription */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className='flex flex-col gap-1'>
                            <label>Full Name</label>
                            <Input placeholder='Ex. Mohd Ayaan' {...register("name", { required: true })} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Select Grade:</label>
                            <select className='p-3 border rounded-lg' {...register("grade", { required: true })}>
                                {
                                    grades.map((item, index) => (
                                        <option key={index} value={item.grade}>{item.grade}</option>
                                    ))
                                }
                            </select>

                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Contact Number</label>
                            <Input type="number" placeholder='Ex. 9451543777' {...register("contact")} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Address</label>
                            <Input placeholder='Ex. Sector-1, Khelgaon, Ranchi, Jharkhand' {...register("address")} />
                        </div>
                        <div className='flex items-center gap-3 justify-end mt-5'>
                            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="destructive" type="submit" disabled={loading}>
                                {loading ? <LoaderIcon className='animate-spin' /> : "Save"}
                            </Button>
                        </div>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewStudent;
