import dbConnect from "@/utils/index";          // Your MongoDB connection utility
import { Attendance, Student } from "@/utils/schema"; // Your Mongoose models
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;
  const month = searchParams.get("month");
  const grade = searchParams.get("grade");

  try {
    // Find students with the given grade
    // and populate their attendance for the given month
    const studentsWithAttendance = await Student.find({ grade })
      .lean()
      .exec();

    // For each student, find attendance matching the month (date)
    const results = await Promise.all(
      studentsWithAttendance.map(async (student) => {
        const attendance = await Attendance.findOne({
          studentId: student._id,
          date: month,
        }).lean();

        return {
          name: student.name,
          present: attendance ? attendance.present : false,
          day: attendance ? attendance.day : null,
          date: attendance ? attendance.date : null,
          grade: student.grade,
          studentId: student._id,
          attendanceId: attendance ? attendance._id : null,
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  const { studentId, present, day, date } = await req.json();

  try {
    const attendance = new Attendance({
      studentId,
      present,
      day,
      date,
    });

    const result = await attendance.save();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");
  const day = Number(searchParams.get("day")); // Ensure day is number

  try {
    const result = await Attendance.deleteOne({
      studentId,
      day,
      date,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete attendance" }, { status: 500 });
  }
}