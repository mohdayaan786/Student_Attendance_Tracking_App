import dbConnect from "@/utils/index"; // Your MongoDB connection utility
import { Grade } from "@/utils/schema"; // Your Grade model
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect(); // ensure DB connection

    try {
        const result = await Grade.find({}).lean(); // fetch all grades
        return NextResponse.json(result);
    } catch (error) {
        console.error("Failed to fetch grades:", error);
        return NextResponse.json({ error: "Failed to fetch grades" }, { status: 500 });
    }
}