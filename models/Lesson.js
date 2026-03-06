const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
    maxlength: [200, 'Lesson title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Lesson description is required']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  type: {
    type: String,
    required: [true, 'Lesson type is required'],
    enum: ['video', 'text', 'interactive', 'quiz', 'practice', 'assignment']
  },
  category: {
    type: String,
    required: [true, 'Lesson category is required'],
    enum: ['reading', 'writing', 'speaking', 'listening', 'grammar', 'vocabulary', 'pronunciation', 'tips', 'practice']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  order: {
    type: Number,
    required: [true, 'Lesson order is required']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Lesson duration is required']
  },
  content: {
    video: {
      url: String,
      thumbnail: String,
      duration: Number, // in seconds
      quality: {
        type: String,
        enum: ['360p', '480p', '720p', '1080p'],
        default: '720p'
      },
      captions: [{
        language: String,
        url: String
      }]
    },
    text: {
      content: String,
      htmlContent: String,
      readingTime: Number, // in minutes
      images: [{
        url: String,
        alt: String,
        caption: String
      }],
      codeBlocks: [{
        language: String,
        code: String
      }]
    },
    interactive: {
      type: {
        type: String,
        enum: ['drag-drop', 'fill-blanks', 'matching', 'speaking-practice', 'writing-practice']
      },
      data: mongoose.Schema.Types.Mixed,
      instructions: String
    },
    quiz: {
      questions: [{
        question: String,
        type: {
          type: String,
          enum: ['multiple-choice', 'true-false', 'short-answer', 'essay']
        },
        options: [String],
        correctAnswer: mongoose.Schema.Types.Mixed,
        explanation: String,
        marks: Number,
        timeLimit: Number
      }],
      passingScore: Number,
      shuffleQuestions: Boolean,
      showResults: Boolean
    },
    practice: {
      exercises: [{
        title: String,
        instructions: String,
        type: {
          type: String,
          enum: ['reading', 'writing', 'speaking', 'listening', 'grammar', 'vocabulary']
        },
        content: mongoose.Schema.Types.Mixed,
        solution: String,
        hints: [String]
      }]
    },
    assignment: {
      instructions: String,
      requirements: [String],
      submissionType: {
        type: String,
        enum: ['text', 'file', 'recording'],
        default: 'text'
      },
      maxFileSize: Number, // in MB
      allowedFileTypes: [String],
      rubric: [{
        criterion: String,
        description: String,
        maxMarks: Number
      }],
      dueDate: Date
    }
  },
  objectives: [String],
  prerequisites: [String],
  learningOutcomes: [String],
  materials: [{
    name: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'audio', 'image', 'link', 'download']
    },
    url: String,
    description: String,
    isDownloadable: {
      type: Boolean,
      default: false
    }
  }],
  resources: [{
    title: String,
    description: String,
    url: String,
    type: {
      type: String,
      enum: ['article', 'video', 'book', 'website', 'tool']
    }
  }],
  tags: [String],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  scheduledPublish: Date,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    averageTimeSpent: {
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
  reviews: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    helpful: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    replies: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

// Create slug from title
lessonSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  next();
});

// Calculate average rating
lessonSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  
  const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / this.reviews.length).toFixed(1);
};

// Update lesson statistics
lessonSchema.methods.updateStats = async function() {
  this.stats.totalReviews = this.reviews.length;
  this.stats.averageRating = this.calculateAverageRating();
  
  // Update completion rate from User model
  const User = mongoose.model('User');
  const enrolledCount = await User.countDocuments({
    'enrolledCourses.completedLessons': this._id
  });
  
  this.stats.completions = enrolledCount;
  
  await this.save();
};

// Virtual for reading time
lessonSchema.virtual('readingTime').get(function() {
  if (this.content.text && this.content.text.readingTime) {
    return this.content.text.readingTime;
  }
  return Math.ceil(this.duration);
});

// Index for better query performance
lessonSchema.index({ slug: 1 });
lessonSchema.index({ type: 1 });
lessonSchema.index({ category: 1 });
lessonSchema.index({ level: 1 });
lessonSchema.index({ course: 1 });
lessonSchema.index({ isPublished: 1 });
lessonSchema.index({ isPreview: 1 });
lessonSchema.index({ tags: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);
