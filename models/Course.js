const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Course title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['ielts-academic', 'ielts-general', 'spoken-english', 'business-english', 'pronunciation', 'grammar', 'vocabulary']
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    weeks: {
      type: Number,
      required: [true, 'Duration in weeks is required'],
      min: 1
    },
    hours: {
      type: Number,
      required: [true, 'Duration in hours is required'],
      min: 1
    }
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'Course price is required'],
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    discount: {
      percentage: {
        type: Number,
        min: 0,
        max: 100
      },
      validUntil: Date
    }
  },
  instructor: {
    name: {
      type: String,
      required: [true, 'Instructor name is required']
    },
    bio: String,
    experience: String,
    qualifications: [String],
    image: String
  },
  thumbnail: {
    type: String,
    required: [true, 'Course thumbnail is required']
  },
  gallery: [String],
  video: {
    url: String,
    duration: Number // in seconds
  },
  lessons: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    type: {
      type: String,
      enum: ['video', 'text', 'quiz', 'assignment', 'practice'],
      required: true
    },
    content: {
      videoUrl: String,
      textContent: String,
      duration: Number,
      quizQuestions: [{
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String
      }],
      assignmentInstructions: String
    },
    order: {
      type: Number,
      required: true
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    resources: [{
      name: String,
      url: String,
      type: {
        type: String,
        enum: ['pdf', 'video', 'audio', 'image', 'link']
      }
    }]
  }],
  learningObjectives: [String],
  prerequisites: [String],
  targetAudience: [String],
  features: [String],
  schedule: {
    startDate: Date,
    endDate: Date,
    classDays: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    classTime: String, // HH:MM format
    mode: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      default: 'online'
    },
    location: String,
    maxStudents: {
      type: Number,
      default: 30
    }
  },
  syllabus: [{
    module: String,
    topics: [String],
    duration: Number // in hours
  }],
  materials: [{
    name: String,
    type: {
      type: String,
      enum: ['book', 'pdf', 'video', 'audio', 'software', 'other']
    },
    url: String,
    isDownloadable: {
      type: Boolean,
      default: false
    }
  }],
  assessments: [{
    type: {
      type: String,
      enum: ['quiz', 'assignment', 'project', 'exam']
    },
    title: String,
    description: String,
    totalMarks: Number,
    passingMarks: Number,
    duration: Number, // in minutes
    attempts: {
      type: Number,
      default: 3
    }
  }],
  certification: {
    provided: {
      type: Boolean,
      default: true
    },
    name: String,
    description: String,
    sampleImage: String
  },
  reviews: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  stats: {
    enrolledStudents: {
      type: Number,
      default: 0
    },
    completedStudents: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Create slug from title
courseSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  
  const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / this.reviews.length).toFixed(1);
};

// Update stats
courseSchema.methods.updateStats = async function() {
  this.stats.totalReviews = this.reviews.length;
  this.stats.averageRating = this.calculateAverageRating();
  
  // Update enrolled and completed students count from User model
  const User = mongoose.model('User');
  const enrolledCount = await User.countDocuments({
    'enrolledCourses.course': this._id,
    'enrolledCourses.status': 'active'
  });
  const completedCount = await User.countDocuments({
    'enrolledCourses.course': this._id,
    'enrolledCourses.status': 'completed'
  });
  
  this.stats.enrolledStudents = enrolledCount;
  this.stats.completedStudents = completedCount;
  
  await this.save();
};

// Index for better query performance
courseSchema.index({ slug: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ isFeatured: 1 });
courseSchema.index({ 'stats.averageRating': -1 });

module.exports = mongoose.model('Course', courseSchema);
