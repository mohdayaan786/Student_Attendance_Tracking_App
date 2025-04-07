'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';

function AddNewStudent() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Button variant="destructive" onClick={()=>setOpen(true)}>+ Add New Student</Button>
            <Dialog open = {open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            <span className='flex flex-col gap-1 py-2'>
                                <label>Full Name</label>
                                <Input placeholder='Ex. Mohd Ayaan' />
                            </span>
                            <span className='flex flex-col gap-1 py-2'>
                                <label>Select Grade : </label>
                                <select className='p-3 border rounded-lg py-2'>
                                    <option value={'5th'}>5th</option>
                                    <option value={'6th'}>6th</option>
                                    <option value={'7th'}>7th</option>
                                </select>
                            </span>
                            <span className='flex flex-col gap-1 py-2'>
                                <label>Contact Number</label>
                                <Input placeholder='Ex. 9451543777' />
                            </span>
                            <span className='flex flex-col gap-1 py-2'>
                                <label>Address</label>
                                <Input placeholder='Ex. Sector-1, Khelgaon, Ranchi, Jharkhand' />
                            </span>
                            <span className='flex items-center gap-3 py-2 justify-end mt-5'>
                                <Button variant="ghost" onClick={()=>setOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={()=>console.log(save)}>Save</Button>
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewStudent
