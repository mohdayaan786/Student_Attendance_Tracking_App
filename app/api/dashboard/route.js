import dbConnect from "@/utils/index";
import { Attendance, Student } from "@/utils/schema"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get('date');
  const grade = searchParams.get('grade');

  console.log("📅 Received Date:", date);
  console.log("🎓 Received Grade:", grade);
  console.log("🔍 Executing Query...");

  try {
    const result = await Attendance.aggregate([
      // Join with Student collection to filter by grade
      {
        $lookup: {
          from: "students", // MongoDB collection name (usually lowercase plural)
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" }, // Flatten the joined student array
      {
        $match: {
          date: date,
          "student.grade": grade
        }
      },
      {
        $group: {
          _id: "$day",
          presentCount: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }, // Descending order by day
      { $limit: 7 },
      {
        $project: {
          day: "$_id",
          presentCount: 1,
          _id: 0
        }
      }
    ]);

    console.log("✅ Query Result from DB:", result);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    return NextResponse.json({ error: "Failed to fetch attendance summary" }, { status: 500 });
  }
}