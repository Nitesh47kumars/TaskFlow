

## TaskFlow

A modern full-stack task management application featuring secure authentication, profile management, and comprehensive task CRUD functionality.

🚀 Features
User Authentication: Secure register & login using JWT.

Protected Routes: Restricted access to Dashboard and Profile pages.

User Management: Profile updates and account settings.

Task CRUD: Full Create, Read, Update, and Delete operations.

Search & Filter: Easily find tasks by keyword or status.

Responsive UI: Modern design built for all screen sizes.

Error Handling: Seamless backend validation display on the frontend.

🛠 Tech Stack
Frontend
React (Vite): Core framework

Tailwind CSS: Styling and layout

React Router DOM: Client-side navigation

Axios: API communication

Context API: Global state management

Backend
Node.js & Express.js: Server-side logic

MongoDB (Mongoose): Database and schema modeling

JWT: Secure token-based authentication

bcrypt: Password hashing

📂 PROJECT STRUCTURE

TaskFlow/
├── Backend/
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middlewares/    # Auth & error handlers
│   │   ├── utils/          # Helper functions
│   │   └── index.js        # Entry point
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── api/            # Axios configurations
│   │   ├── components/     # UI components
│   │   ├── context/        # Auth & Task providers
│   │   ├── pages/          # View components
│   │   └── main.jsx        # App entry
│   └── package.json
│
└── README.md