import { db } from "@/utils";
import { ATTENDACE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');
    const grade = searchParams.get('grade');

    console.log("📅 Received Date:", date);
    console.log("🎓 Received Grade:", grade);
    console.log("🔍 Executing Query...");

    const result = await db.select({
        day: ATTENDACE.day,
        presentCount: sql`count(${ATTENDACE.day})`
    }).from(ATTENDACE)
        .innerJoin(STUDENTS, eq(ATTENDACE.studentId, STUDENTS.id))
        .where(and(
            eq(ATTENDACE.date, sql`${date}`), // Ensure `date` is treated as a string
            eq(STUDENTS.grade, sql`${grade}`) // Ensure `grade` is treated as a string
        ))
        .groupBy(ATTENDACE.day)
        .orderBy(desc(ATTENDACE.day))
        .limit(7);

    console.log("✅ Query Result from DB:", result);

    return NextResponse.json(result);
}
