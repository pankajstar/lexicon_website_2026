# Lexicon Spoken English and IELTS Academy

A comprehensive web application for Lexicon Spoken English and IELTS Academy, featuring course management, practice tests, video lessons, and student administration.

## 🚀 Features

### Frontend (Next.js + Tailwind CSS)
- **Modern Landing Page** with hero section, courses, and success stories
- **Responsive Navigation** with sticky header and mobile menu
- **IELTS Practice Test Platform** with timer, scoring, and results
- **Learning Resources** section with tips and strategies
- **Spoken English Modules** with daily conversation practice
- **Video Learning Section** with embedded YouTube lessons
- **Student Dashboard** for course progress and test results
- **Admin Dashboard** for content management
- **Authentication System** with JWT and Google SSO

### Backend (Node.js + Express + MongoDB)
- **RESTful APIs** for all frontend features
- **JWT Authentication** with refresh tokens
- **MongoDB Database** with comprehensive schemas
- **File Upload** support for course materials
- **Email Notifications** for user registration
- **Rate Limiting** and security middleware
- **Comprehensive Error Handling**

## 📁 Project Structure

```
lexicon-academy/
├── frontend/                 # Next.js frontend application
│   ├── components/           # Reusable React components
│   ├── pages/               # Next.js pages
│   ├── styles/              # CSS and Tailwind styles
│   ├── utils/               # Utility functions
│   ├── hooks/               # Custom React hooks
│   └── public/              # Static assets
├── backend/                 # Node.js backend API
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   └── utils/               # Backend utilities
├── database/                # Database schemas and migrations
└── docs/                   # Documentation
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **React Hook Form** - Form handling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email sending

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 5.0+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lexicon-academy
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
npm install
```

4. **Environment Setup**
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit the .env file with your configuration
```

5. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

6. **Run the application**
```bash
# Start backend (terminal 1)
cd backend
npm run dev

# Start frontend (terminal 2)
cd frontend
npm run dev
```

7. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📝 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/lexicon-academy

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/AWS)
1. Deploy Node.js application to Render or AWS EC2
2. Configure MongoDB Atlas for production database
3. Set production environment variables
4. Configure SSL certificate

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Test Endpoints
- `GET /api/tests` - Get all practice tests
- `GET /api/tests/:id` - Get test by ID
- `POST /api/tests/:id/start` - Start test
- `POST /api/tests/:id/submit` - Submit test
- `GET /api/tests/:id/results` - Get test results

## 🎯 Key Features Implementation

### IELTS Practice Test System
- Reading, Writing, Speaking, Listening modules
- Timer functionality with pause/resume
- Automatic scoring and band calculation
- Detailed performance analytics
- Question bank with difficulty levels

### Learning Management
- Course enrollment and progress tracking
- Video lessons with captions
- Interactive exercises and quizzes
- Downloadable study materials
- Personalized recommendations

### User Management
- Student registration and profiles
- Admin dashboard for content management
- Role-based access control
- Progress tracking and analytics
- Certificate generation

## 🔒 Security Features
- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting for API endpoints
- CORS configuration
- Input validation and sanitization
- SQL injection prevention

## 📱 Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Optimized for all screen sizes
- Touch-friendly interface
- Progressive web app features

## 🧪 Testing
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 📈 Performance Optimization
- Next.js automatic code splitting
- Image optimization
- Lazy loading for components
- Database query optimization
- CDN integration ready

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
This project is licensed under the MIT License.

## 📞 Support
For support, please contact:
- Email: info@lexiconacademy.com
- Phone: 9767973647, 7972492325
- Address: Sr. No. 6/1k, Flat No. D-20, Vilasnagar Society, Deshmukhwadi, NDA Rd, Shivane, Pune – 411023

---

**Transform Your English. Transform Your Future.**
