# Student Team Management

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing student team members. The application allows you to add team members, view their profiles, and manage their information efficiently.


## Application Screenshot

![Screenshot 2025-05-01 234644](https://github.com/user-attachments/assets/7b026536-270b-4616-a8ec-68e5f9681e6c)
![Screenshot 2025-05-01 234717](https://github.com/user-attachments/assets/a4f1b8bd-9695-420e-bb66-89cd785c5212)
![Screenshot 2025-05-01 234737](https://github.com/user-attachments/assets/9d90ad82-82cb-4a45-8c7c-c4ec1913931b)
![Screenshot 2025-05-01 234805](https://github.com/user-attachments/assets/391c7c32-de6a-4f21-974d-86dc51d5278b)

## Features

- 📝 Add new team members with detailed information
- 🖼️ Upload and manage profile images
- 👥 View all team members in an organized grid layout
- 👤 Access detailed member profiles
- 🎨 Modern, responsive UI with smooth animations
- 🔒 Form validation and error handling

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Framer Motion for animations
- React Hook Form for form handling
- Axios for API communication
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- Multer for file uploads
- CORS for cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database (local or cloud instance)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-team-management
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development servers:
```bash
npm run dev:all
```

This will start both the frontend (Vite) and backend servers concurrently.

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
student-team-management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── uploads/
└── package.json
```

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the frontend for production
- `npm run server` - Start the backend server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code linting

## API Endpoints

- `GET /api/members` - Get all team members
- `GET /api/members/:id` - Get a specific team member by ID
- `POST /api/members` - Create a new team member (supports multipart/form-data for image upload)

## Features in Detail

### Home Page
- Welcome message and team introduction
- Quick navigation to add or view members
- Animated UI components
- Responsive design

### Add Member Page
- Form validation
- Image upload preview
- Success/error notifications
- Automatic redirection after successful submission

### View Members Page
- Grid layout of member cards
- Animated card interactions
- Quick access to member details
- Loading and error states

### Member Details Page
- Comprehensive member information
- Profile image display
- Skills tags
- Join date information
