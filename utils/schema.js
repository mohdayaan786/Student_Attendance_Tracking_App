import { int, mysqlTable, varchar, boolean } from "drizzle-orm/mysql-core";

export const GRADES = mysqlTable('grades', {
  id: int('id').primaryKey(),
  grade: varchar('grade', { length: 10 }).notNull()
});

export const STUDENTS = mysqlTable('students', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 20 }).notNull(),
  grade: varchar('grade', { length: 10 }).notNull(),
  address: varchar('address', { length: 50 }),
  contact: varchar('contact', { length: 11 }),
});

export const ATTENDACE = mysqlTable('attendance', {
  id: int('id').autoincrement().primaryKey(),
  studentId: int('studentId', { length: 11 }).notNull(),
  present: boolean('present').default(false),
  day: int('day', { length: 11 }).notNull(), // 22
  date: varchar('date', { length: 20 }).notNull() // 05/2024
});

