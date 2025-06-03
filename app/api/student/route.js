import dbConnect from "@/utils/index"; // Your MongoDB connection helper
import { Student } from "@/utils/schema"; // Your Mongoose Student model
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect();

    try {
        const data = await req.json();

        const newStudent = new Student({
            name: data?.name,
            grade: data?.grade,
            address: data?.address,
            contact: data?.contact,
        });

        const result = await newStudent.save();

        return NextResponse.json(result);
    } catch (error) {
        console.error("Failed to create student:", error);
        return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
    }
}

export async function GET() {
    await dbConnect();

    try {
        const result = await Student.find({}).lean();
        return NextResponse.json(result);
    } catch (error) {
        console.error("Failed to get students:", error);
        return NextResponse.json({ error: "Failed to get students" }, { status: 500 });
    }
}

export async function DELETE(req) {
    await dbConnect();

    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");

        const result = await Student.findByIdAndDelete(id);

        return NextResponse.json({ success: !!result });
    } catch (error) {
        console.error("Failed to delete student:", error);
        return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
    }
}