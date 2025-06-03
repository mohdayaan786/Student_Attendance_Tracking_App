// models/index.js or models/models.js
import mongoose from 'mongoose';

// Avoid model overwrite issues in Next.js hot-reload
const gradeSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
    maxlength: 10,
  },
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  grade: {
    type: String,
    required: true,
    maxlength: 10,
  },
  address: {
    type: String,
    maxlength: 50,
  },
  contact: {
    type: String,
    maxlength: 11,
  },
});

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  present: {
    type: Boolean,
    default: false,
  },
  day: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    maxlength: 20,
  },
});

// Prevent model overwrite error in dev (Next.js hot reload)
const Grade = mongoose.models.Grade || mongoose.model('Grade', gradeSchema);
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

export { Grade, Student, Attendance };