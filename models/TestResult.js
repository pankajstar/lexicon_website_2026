const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PracticeTest',
    required: true
  },
  attempt: {
    type: Number,
    required: true,
    default: 1
  },
  startedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  completedAt: Date,
  timeSpent: {
    type: Number, // in minutes
    required: true
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned', 'expired'],
    default: 'in-progress'
  },
  answers: [{
    sectionIndex: Number,
    questionIndex: Number,
    question: String,
    givenAnswer: mongoose.Schema.Types.Mixed,
    correctAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    marks: {
      obtained: Number,
      total: Number
    },
    timeSpent: Number, // in seconds
    attempts: Number,
    hints: [String]
  }],
  sectionResults: [{
    sectionName: String,
    totalQuestions: Number,
    correctAnswers: Number,
    totalMarks: Number,
    obtainedMarks: Number,
    percentage: Number,
    timeSpent: Number,
    bandScore: Number
  }],
  scores: {
    total: {
      obtained: {
        type: Number,
        required: true
      },
      maximum: {
        type: Number,
        required: true
      },
      percentage: {
        type: Number,
        required: true
      }
    },
    sectionWise: {
      reading: { obtained: Number, maximum: Number, percentage: Number },
      writing: { obtained: Number, maximum: Number, percentage: Number },
      speaking: { obtained: Number, maximum: Number, percentage: Number },
      listening: { obtained: Number, maximum: Number, percentage: Number }
    }
  },
  bandScore: {
    overall: {
      type: Number,
      min: 0,
      max: 9
    },
    sectionWise: {
      reading: { type: Number, min: 0, max: 9 },
      writing: { type: Number, min: 0, max: 9 },
      speaking: { type: Number, min: 0, max: 9 },
      listening: { type: Number, min: 0, max: 9 }
    }
  },
  performance: {
    accuracy: {
      type: Number,
      min: 0,
      max: 100
    },
    speed: {
      questionsPerMinute: Number,
      averageTimePerQuestion: Number
    },
    difficultyAnalysis: {
      easy: { correct: Number, total: Number, percentage: Number },
      medium: { correct: Number, total: Number, percentage: Number },
      hard: { correct: Number, total: Number, percentage: Number }
    },
    topicAnalysis: [{
      topic: String,
      correct: Number,
      total: Number,
      percentage: Number
    }]
  },
  feedback: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    nextSteps: [String],
    detailedFeedback: String
  },
  review: {
    reviewed: {
      type: Boolean,
      default: false
    },
    reviewedAt: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    instructorNotes: String,
    instructorRating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    issuedAt: Date,
    certificateUrl: String,
    certificateId: String
  },
  analytics: {
    questionWiseTime: [Number], // time spent on each question
    pauseCount: Number,
    totalPauseTime: Number,
    deviceInfo: {
      userAgent: String,
      screenResolution: String,
      browser: String,
      os: String
    },
    networkInfo: {
      connectionType: String,
      speed: String
    }
  },
  flags: {
    suspicious: {
      type: Boolean,
      default: false
    },
    flagReason: String,
    flaggedAt: Date
  }
}, {
  timestamps: true
});

// Calculate total score and percentage
testResultSchema.methods.calculateScores = function() {
  let totalObtained = 0;
  let totalMaximum = 0;
  
  this.answers.forEach(answer => {
    if (answer.marks) {
      totalObtained += answer.marks.obtained || 0;
      totalMaximum += answer.marks.total || 0;
    }
  });
  
  this.scores.total.obtained = totalObtained;
  this.scores.total.maximum = totalMaximum;
  this.scores.total.percentage = totalMaximum > 0 ? ((totalObtained / totalMaximum) * 100).toFixed(2) : 0;
  
  return this.scores.total;
};

// Calculate band score
testResultSchema.methods.calculateBandScore = function(test) {
  if (!test) return;
  
  // Use the test's band score mapping
  const percentage = parseFloat(this.scores.total.percentage);
  const bandScore = test.calculateBandScore(percentage);
  
  this.bandScore.overall = bandScore;
  
  // Calculate section-wise band scores if available
  if (this.scores.sectionWise) {
    Object.keys(this.scores.sectionWise).forEach(section => {
      const sectionScore = this.scores.sectionWise[section];
      if (sectionScore && sectionScore.percentage) {
        this.bandScore.sectionWise[section] = test.calculateBandScore(sectionScore.percentage);
      }
    });
  }
  
  return this.bandScore;
};

// Calculate performance metrics
testResultSchema.methods.calculatePerformance = function() {
  const totalQuestions = this.answers.length;
  const correctAnswers = this.answers.filter(answer => answer.isCorrect).length;
  
  this.performance.accuracy = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;
  
  // Calculate speed metrics
  if (this.timeSpent > 0) {
    this.performance.speed.questionsPerMinute = (totalQuestions / this.timeSpent).toFixed(2);
    this.performance.speed.averageTimePerQuestion = (this.timeSpent / totalQuestions).toFixed(2);
  }
  
  // Analyze difficulty-wise performance
  const difficultyAnalysis = { easy: { correct: 0, total: 0, percentage: 0 }, medium: { correct: 0, total: 0, percentage: 0 }, hard: { correct: 0, total: 0, percentage: 0 } };
  
  // This would need to be populated from the test questions
  // For now, we'll keep the structure
  
  this.performance.difficultyAnalysis = difficultyAnalysis;
  
  return this.performance;
};

// Generate feedback based on performance
testResultSchema.methods.generateFeedback = function() {
  const percentage = parseFloat(this.scores.total.percentage);
  const bandScore = this.bandScore.overall;
  
  this.feedback.strengths = [];
  this.feedback.weaknesses = [];
  this.feedback.recommendations = [];
  this.feedback.nextSteps = [];
  
  if (percentage >= 80) {
    this.feedback.strengths.push('Excellent overall performance');
    this.feedback.recommendations.push('Ready for the actual IELTS test');
  } else if (percentage >= 60) {
    this.feedback.strengths.push('Good performance');
    this.feedback.recommendations.push('Focus on weak areas for improvement');
  } else {
    this.feedback.weaknesses.push('Needs more practice');
    this.feedback.recommendations.push('Consider taking foundation courses');
  }
  
  if (bandScore >= 7) {
    this.feedback.nextSteps.push('You are ready for most universities');
  } else if (bandScore >= 6) {
    this.feedback.nextSteps.push('Good score, aim for higher bands');
  } else {
    this.feedback.nextSteps.push('Regular practice needed to improve');
  }
  
  return this.feedback;
};

// Virtual for completion status
testResultSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

// Virtual for pass/fail
testResultSchema.virtual('isPassed').get(function() {
  const percentage = parseFloat(this.scores.total.percentage);
  return percentage >= 60; // Assuming 60% is passing
});

// Index for better query performance
testResultSchema.index({ student: 1 });
testResultSchema.index({ test: 1 });
testResultSchema.index({ status: 1 });
testResultSchema.index({ completedAt: -1 });
testResultSchema.index({ 'bandScore.overall': -1 });
testResultSchema.index({ 'scores.total.percentage': -1 });

module.exports = mongoose.model('TestResult', testResultSchema);
