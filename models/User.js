const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'instructor'],
    default: 'student'
  },
  profile: {
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' }
    },
    education: String,
    occupation: String,
    targetCountry: String,
    targetScore: {
      type: Number,
      min: 0,
      max: 9
    }
  },
  enrolledCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedLessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active'
    }
  }],
  testResults: [{
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PracticeTest'
    },
    score: {
      type: Number,
      required: true
    },
    bandScore: {
      type: Number,
      min: 0,
      max: 9
    },
    answers: [mongoose.Schema.Types.Mixed],
    completedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: Number // in minutes
  }],
  savedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  preferences: {
    language: {
      type: String,
      default: 'english'
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    studyReminders: {
      enabled: { type: Boolean, default: true },
      time: String // HH:MM format
    }
  },
  googleId: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Get enrolled course count
userSchema.virtual('enrolledCourseCount').get(function() {
  return this.enrolledCourses.length;
});

// Get completed tests count
userSchema.virtual('completedTestCount').get(function() {
  return this.testResults.length;
});

// Calculate average IELTS score
userSchema.virtual('averageIELTSScore').get(function() {
  if (this.testResults.length === 0) return 0;
  
  const ieltsTests = this.testResults.filter(result => result.bandScore);
  if (ieltsTests.length === 0) return 0;
  
  const total = ieltsTests.reduce((sum, result) => sum + result.bandScore, 0);
  return (total / ieltsTests.length).toFixed(1);
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'enrolledCourses.course': 1 });

module.exports = mongoose.model('User', userSchema);
