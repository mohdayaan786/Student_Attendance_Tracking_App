import { db } from "@/utils";
import { ATTENDACE, STUDENTS } from "@/utils/schema";
import { and, eq, is, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const month = searchParams.get("month");
    const grade = searchParams.get("grade");

    const result = await db.select({
        name: STUDENTS.name,
        present: ATTENDACE.present,
        day: ATTENDACE.day,
        date: ATTENDACE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDACE.id
    })
        .from(STUDENTS)
        .leftJoin(ATTENDACE, and(eq(STUDENTS.id, ATTENDACE.studentId), eq(ATTENDACE.date, month)))
        .where(eq(STUDENTS.grade, grade))

    return NextResponse.json(result)
}

export async function POST(req) {
    const body = await req.json();
    const { studentId, present, day, date } = body;
    const result = await db.insert(ATTENDACE).values({
        studentId,
        present,
        day,
        date
    })
    return NextResponse.json(result);
}


export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const date = searchParams.get('date');
    const day = searchParams.get('day');

    const result = await db.delete(ATTENDACE)
        .where(
            and(
                eq(ATTENDACE.studentId, studentId),
                eq(ATTENDACE.day, day),
                eq(ATTENDACE.date, date)
            )
        )

    return NextResponse.json(result);
}
