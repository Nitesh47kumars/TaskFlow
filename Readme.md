### TaskFlow

A modern full-stack task management application featuring secure authentication, profile management, and comprehensive task CRUD functionality.

## 🚀 Features
User Authentication: Secure register & login using JWT.
Protected Routes: Restricted access to Dashboard and Profile pages.
User Management: Profile updates and account settings.
Task CRUD: Full Create, Read, Update, and Delete operations.
Search & Filter: Easily find tasks by keyword or status.
Responsive UI: Modern design built for all screen sizes.
Error Handling: Seamless backend validation display on the frontend.

## 🛠 Tech Stack

# Frontend

React (Vite): Core framework
Tailwind CSS: Styling and layout
React Router DOM: Client-side navigation
Axios: API communication
Context API: Global state management

# Backend

Node.js & Express.js: Server-side logic
MongoDB (Mongoose): Database and schema modeling
JWT: Secure token-based authentication
bcrypt: Password hashing

## 📂 PROJECT STRUCTURE

TaskFlow/
├── Backend/
│ ├── src/
│ │ ├── controllers/ # Business logic
│ │ ├── models/ # Database schemas
│ │ ├── routes/ # API endpoints
│ │ ├── middlewares/ # Auth & error handlers
│ │ ├── utils/ # Helper functions
│ │ └── index.js # Entry point
│ ├── .env
│ └── package.json
│
├── Frontend/
│ ├── src/
│ │ ├── api/ # Axios configurations
│ │ ├── components/ # UI components
│ │ ├── context/ # Auth & Task providers
│ │ ├── pages/ # View components
│ │ └── main.jsx # App entry
│ └── package.json
│
└── README.md

## ⚙️ Setup and Installation

# 1. Clone the Repository

git clone https://github.com/your-username/TaskFlow.git
cd TaskFlow

# Environment Variables: Create a .env file in the Backend directory:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Backend Setup

cd .\Backend\
npm install
npm run dev

# Server running at http://localhost:3000

3. Frontend Setup

cd .\Frontend\
npm install
npm run dev

# App running at http://localhost:5173


### 🛣 API Endpoints

User Routes

POST   /api/v1/users/register
POST   /api/v1/users/login
GET    /api/v1/users/me
PUT    /api/v1/users/me


Task Routes

GET    /api/v1/tasks
POST   /api/v1/tasks
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id


### Notes for Reviewers

Security: JWTs are stored in localStorage; Axios interceptors automatically inject the Authorization header into requests.

Architecture: Clean separation of concerns with user-scoped tasks.

UI/UX: Implemented ProtectedRoute components to handle unauthorized access attempts.

🔮 Future Improvements
[] Password reset flow via email.

[] Refresh token support for longer sessions.

[] Server-side pagination for task lists.

[] Toast notifications for better user feedback.
