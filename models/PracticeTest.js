const mongoose = require('mongoose');

const practiceTestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Test title is required'],
    trim: true,
    maxlength: [200, 'Test title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Test description is required']
  },
  type: {
    type: String,
    required: [true, 'Test type is required'],
    enum: ['reading', 'listening', 'speaking', 'writing', 'full-test']
  },
  category: {
    type: String,
    required: [true, 'Test category is required'],
    enum: ['academic', 'general', 'practice', 'mock']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  duration: {
    type: Number,
    required: [true, 'Test duration is required (in minutes)']
  },
  instructions: {
    general: String,
    specific: String
  },
  sections: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    duration: Number, // in minutes
    questions: [{
      type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'matching', 'short-answer', 'essay', 'speaking-recording', 'fill-blanks', 'drag-drop'],
        required: true
      },
      question: {
        type: String,
        required: true
      },
      questionNumber: {
        type: Number,
        required: true
      },
      passage: String, // For reading tests
      audioUrl: String, // For listening tests
      imageUrl: String, // For questions with images
      options: [String], // For multiple choice
      correctAnswer: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      },
      explanation: String,
      marks: {
        type: Number,
        default: 1
      },
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
      },
      tags: [String],
      timeLimit: Number, // in seconds, optional per question
      hints: [String]
    }],
    passingMarks: Number,
    totalMarks: {
      type: Number,
      required: true
    }
  }],
  scoring: {
    totalMarks: {
      type: Number,
      required: true
    },
    passingMarks: {
      type: Number,
      required: true
    },
    bandScoreMapping: {
      type: Map,
      of: Number,
      default: new Map([
        [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2], [5, 2.5],
        [6, 3], [7, 3.5], [8, 4], [9, 4.5], [10, 5], [11, 5.5],
        [12, 6], [13, 6.5], [14, 7], [15, 7.5], [16, 8], [17, 8.5],
        [18, 9], [19, 9], [20, 9]
      ])
    }
  },
  materials: [{
    name: String,
    type: {
      type: String,
      enum: ['pdf', 'audio', 'video', 'image', 'text']
    },
    url: String,
    description: String
  }],
  attempts: {
    allowed: {
      type: Number,
      default: 3
    },
    timeBetweenAttempts: {
      type: Number, // in hours
      default: 24
    }
  },
  settings: {
    shuffleQuestions: {
      type: Boolean,
      default: false
    },
    shuffleOptions: {
      type: Boolean,
      default: false
    },
    showResultsImmediately: {
      type: Boolean,
      default: true
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true
    },
    allowReview: {
      type: Boolean,
      default: true
    },
    timer: {
      enabled: {
        type: Boolean,
        default: true
      },
      showTimer: {
        type: Boolean,
        default: true
      },
      pauseAllowed: {
        type: Boolean,
        default: false
      }
    }
  },
  prerequisites: [String],
  learningObjectives: [String],
  tags: [String],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  stats: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    averageBandScore: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    averageTimeSpent: {
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
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  scheduledPublish: Date,
  scheduledArchive: Date
}, {
  timestamps: true
});

// Create slug from title
practiceTestSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  next();
});

// Calculate band score from marks
practiceTestSchema.methods.calculateBandScore = function(marks) {
  const mapping = this.scoring.bandScoreMapping;
  const sortedKeys = Array.from(mapping.keys()).sort((a, b) => a - b);
  
  for (let i = sortedKeys.length - 1; i >= 0; i--) {
    if (marks >= sortedKeys[i]) {
      return mapping.get(sortedKeys[i]);
    }
  }
  return 0;
};

// Update test statistics
practiceTestSchema.methods.updateStats = async function() {
  const TestResult = mongoose.model('TestResult');
  const results = await TestResult.find({ test: this._id, completed: true });
  
  if (results.length > 0) {
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalBandScore = results.reduce((sum, result) => sum + result.bandScore, 0);
    const totalTimeSpent = results.reduce((sum, result) => sum + result.timeSpent, 0);
    
    this.stats.totalAttempts = results.length;
    this.stats.averageScore = (totalScore / results.length).toFixed(2);
    this.stats.averageBandScore = (totalBandScore / results.length).toFixed(2);
    this.stats.averageTimeSpent = (totalTimeSpent / results.length).toFixed(2);
    this.stats.completionRate = ((results.filter(r => r.completed).length / results.length) * 100).toFixed(2);
  }
  
  await this.save();
};

// Virtual for total questions
practiceTestSchema.virtual('totalQuestions').get(function() {
  return this.sections.reduce((total, section) => total + section.questions.length, 0);
});

// Virtual for total marks
practiceTestSchema.virtual('totalMarks').get(function() {
  return this.scoring.totalMarks;
});

// Index for better query performance
practiceTestSchema.index({ slug: 1 });
practiceTestSchema.index({ type: 1 });
practiceTestSchema.index({ category: 1 });
practiceTestSchema.index({ level: 1 });
practiceTestSchema.index({ status: 1 });
practiceTestSchema.index({ isFeatured: 1 });
practiceTestSchema.index({ 'stats.averageBandScore': -1 });

module.exports = mongoose.model('PracticeTest', practiceTestSchema);
