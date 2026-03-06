☁️ Cloud-Based Task Management System

A Cloud-Based Task Management System that helps teams create, assign, manage, and track tasks efficiently in real time. This application allows users to collaborate, organize tasks by priority and status, and monitor project progress through a modern web interface.

🚀 Features

👤 User Authentication (Login / Register)

📝 Create, Update, Delete Tasks

📌 Assign Tasks to Team Members

📅 Task Scheduling with Due Dates

⚡ Task Status Management (Todo, In Progress, Completed)

🔥 Priority Levels (Low, Normal, High)

📂 Attach Assets / Files to Tasks

📊 Dashboard for Task Overview

👥 User Role Management

🗑️ Trash & Restore Deleted Tasks

📱 Responsive UI

🏗️ Tech Stack
Frontend

React.js

Redux Toolkit

Tailwind CSS

React Icons

Headless UI

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Deployment

Netlify (Frontend)

Render / Railway / AWS (Backend)

MongoDB Atlas (Database)

📂 Project Structure
Task-Management-System
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── utils
│   │   └── App.js
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
└── README.md
⚙️ Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/cloud-task-manager.git
cd cloud-task-manager
2️⃣ Install Dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install
3️⃣ Environment Variables

Create a .env file inside backend

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
▶️ Run the Project
Start Backend
cd backend
npm run dev
Start Frontend
cd frontend
npm start
🌐 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
📸 Screenshots
Dashboard

Task overview with statistics and recent activities.

Add Task

Create and assign tasks to team members with priority and deadline.

Task Details

View full task information, comments, and attachments.

🔒 Security

JWT Authentication

Protected Routes

Role-Based Access Control

📦 Future Improvements

Real-time notifications

Team chat

Task comments

Activity logs

Email reminders

Drag & drop Kanban board

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a new branch

git checkout -b feature-name

Commit your changes

git commit -m "Added new feature"

Push to GitHub

git push origin feature-name
📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Anand Thakur

Full Stack Developer

Passionate about building scalable web applications.
