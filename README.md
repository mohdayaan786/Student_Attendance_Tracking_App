# 📌 Attendify - Student Attendance Tracking System

Attendify is a modern and efficient **Student Attendance Tracking System** that helps educational institutions track student attendance seamlessly. It provides an intuitive dashboard, graphical insights, and secure authentication using **Kinde Auth**.

---

## 🚀 Features

- 🔐 **Secure Authentication** - Powered by Kinde Auth
- 📊 **Intuitive Dashboard** - View attendance statistics
- 📅 **Attendance Management** - Track student attendance by month & grade
- 📈 **Graphical Insights** - Bar charts & pie charts for attendance trends
- 👥 **Student Management** - Add, remove, and update student records
- 🌍 **Multi-Language Support**
- 🌑 **Dark Mode Support**
- 🛠 **Role-Based Access Control** *(Upcoming)*

---

## 🛠 Tech Stack

### **Frontend**
- **Next.js** - React Framework
- **Tailwind CSS** - Styling
- **ShadCN UI** - UI Components
- **Lucide Icons** - Icon Set

### **Backend**
- **Node.js** - JavaScript Runtime
- **Next.js API Routes** - Backend API
- **Kinde Auth** - Authentication

### **Database & ORM**
- **MySQL** - Relational Database
- **Drizzle ORM** - Database Management

---

## ⚙️ Installation & Setup

1️⃣ **Clone the Repository**
```bash
 git clone https://github.com/mohdayaan786/Student_Attendance_Tracking_App.git
 cd Student_Attendance_Tracking_App
```

2️⃣ **Install Dependencies**
```bash
 npm install
```

3️⃣ **Set Up Environment Variables**
Create a `.env.local` file and configure the following:
```env
KINDE_CLIENT_ID=4eee425283df48bdb5d2eb158df1de9f
KINDE_CLIENT_SECRET=CdojQayXp5oUsfPXAImy3eYXuvQXL9OsoahClqFvmSl2JCn7qudey
KINDE_ISSUER_URL=https://attendancetracker8071.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

4️⃣ **Run the Development Server**
```bash
 npm run dev
```
Access the app at **`http://localhost:3000`**

---

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### **Students**
- `GET /api/students` - Fetch all students
- `POST /api/students` - Add a new student

### **Attendance**
- `GET /api/attendance?grade=GRADE&date=MM/YYYY` - Fetch attendance records
- `POST /api/attendance` - Add attendance record

---

## 📌 Future Enhancements

- 📱 **Mobile App Integration**
- 🏫 **Multi-School Support**
- 📜 **Attendance Reports Download**
- 🛠 **Role-Based Access Control**

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📜 License

This project is **MIT Licensed**. You are free to modify and distribute it.

---

### ✨ Developed with ❤️ by **Mohd Ayaan**

