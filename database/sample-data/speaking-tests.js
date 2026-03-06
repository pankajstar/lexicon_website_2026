const mongoose = require('mongoose');
const PracticeTest = require('../backend/models/PracticeTest');

const sampleSpeakingTests = [
  {
    title: 'IELTS Speaking Practice Test 1 - Complete Test',
    slug: 'ielts-speaking-practice-test-1',
    description: 'Complete IELTS speaking test with all three parts. Practice introduction, individual long turn, and discussion sections.',
    type: 'speaking',
    category: 'practice',
    level: 'intermediate',
    duration: 14, // Total speaking time
    instructions: {
      general: 'The speaking test consists of three parts. In Part 1, you will answer questions about yourself. In Part 2, you will speak for 1-2 minutes on a topic. In Part 3, you will have a discussion on related topics.',
      specific: 'Speak clearly and at a natural pace. Your responses will be recorded for evaluation.'
    },
    sections: [
      {
        name: 'Part 1: Introduction and Interview',
        description: 'General questions about yourself, your background, and familiar topics',
        duration: 5,
        questions: [
          {
            type: 'introduction',
            question: 'What is your full name?',
            preparationTime: 0,
            recordingTime: 30,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 1
          },
          {
            type: 'introduction',
            question: 'Where are you from?',
            preparationTime: 0,
            recordingTime: 30,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 2
          },
          {
            type: 'introduction',
            question: 'Do you work or are you a student?',
            preparationTime: 0,
            recordingTime: 30,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 3
          },
          {
            type: 'familiar_topic',
            question: 'What do you like about your hometown?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 4
          },
          {
            type: 'familiar_topic',
            question: 'Is there anything you would like to change about your hometown?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 5
          },
          {
            type: 'familiar_topic',
            question: 'Let\'s talk about hobbies. What do you do in your free time?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 6
          },
          {
            type: 'familiar_topic',
            question: 'Do you prefer spending time alone or with others? Why?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 7
          }
        ],
        passingMarks: 5,
        totalMarks: 7
      },
      {
        name: 'Part 2: Individual Long Turn',
        description: 'Speak for 1-2 minutes on a given topic card',
        duration: 4,
        questions: [
          {
            type: 'cue_card',
            question: 'Describe a teacher who has influenced you in your education. You should say: who this teacher was, what subject they taught, what qualities they had, and explain how they influenced you.',
            preparationTime: 60,
            recordingTime: 120,
            marks: 2,
            difficulty: 'medium',
            questionNumber: 8
          }
        ],
        passingMarks: 1,
        totalMarks: 2
      },
      {
        name: 'Part 3: Two-way Discussion',
        description: 'Discussion related to the Part 2 topic',
        duration: 5,
        questions: [
          {
            type: 'discussion',
            question: 'What qualities make a good teacher?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'medium',
            questionNumber: 9
          },
          {
            type: 'discussion',
            question: 'How has technology changed the way we learn?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'medium',
            questionNumber: 10
          },
          {
            type: 'discussion',
            question: 'Do you think online learning will replace traditional classrooms?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'hard',
            questionNumber: 11
          }
        ],
        passingMarks: 3,
        totalMarks: 6
      }
    ],
    scoring: {
      totalMarks: 15,
      passingMarks: 10,
      bandScoreMapping: new Map([
        [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2], [5, 2.5],
        [6, 3], [7, 3.5], [8, 4], [9, 4.5], [10, 5], [11, 5.5],
        [12, 6], [13, 6.5], [14, 7], [15, 7.5]
      ])
    },
    materials: [
      {
        name: 'Speaking Test Guidelines',
        type: 'pdf',
        url: '/materials/speaking-guidelines.pdf',
        description: 'Complete guidelines for IELTS speaking test'
      },
      {
        name: 'Sample Answers',
        type: 'pdf',
        url: '/materials/sample-speaking-answers.pdf',
        description: 'Band 8+ sample answers for reference'
      }
    ],
    attempts: {
      allowed: 3,
      timeBetweenAttempts: 24
    },
    settings: {
      shuffleQuestions: false,
      shuffleOptions: false,
      showResultsImmediately: false,
      showCorrectAnswers: false,
      allowReview: false,
      timer: {
        enabled: true,
        showTimer: true,
        pauseAllowed: true
      }
    },
    prerequisites: ['Basic English speaking ability', 'Microphone access'],
    learningObjectives: [
      'Practice speaking fluently and coherently',
      'Develop ability to speak at length on a topic',
      'Express and justify opinions',
      'Discuss abstract topics and issues'
    ],
    tags: ['speaking', 'fluency', 'coherence', 'pronunciation', 'vocabulary'],
    difficulty: 'medium',
    status: 'published',
    isFeatured: true
  },
  {
    title: 'IELTS Speaking Practice Test 2 - Technology Focus',
    slug: 'ielts-speaking-practice-test-2',
    description: 'Speaking test focused on technology-related topics. Practice discussing modern technology and its impact on society.',
    type: 'speaking',
    category: 'practice',
    level: 'advanced',
    duration: 14,
    instructions: {
      general: 'This speaking test focuses on technology-related topics. Be prepared to discuss various aspects of technology in your daily life and society.',
      specific: 'Use appropriate vocabulary related to technology and express your opinions clearly.'
    },
    sections: [
      {
        name: 'Part 1: Technology in Daily Life',
        description: 'Questions about technology usage and preferences',
        duration: 5,
        questions: [
          {
            type: 'familiar_topic',
            question: 'How often do you use the internet?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 1
          },
          {
            type: 'familiar_topic',
            question: 'What do you mainly use your smartphone for?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 2
          },
          {
            type: 'familiar_topic',
            question: 'Do you prefer using apps or websites? Why?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 3
          },
          {
            type: 'familiar_topic',
            question: 'What technology couldn\'t you live without?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 4
          }
        ],
        passingMarks: 3,
        totalMarks: 4
      },
      {
        name: 'Part 2: Technology Innovation',
        description: 'Describe a piece of technology you find useful',
        duration: 4,
        questions: [
          {
            type: 'cue_card',
            question: 'Describe a piece of technology you find useful. You should say: what it is, how you use it, why you find it useful, and explain how it has changed your life.',
            preparationTime: 60,
            recordingTime: 120,
            marks: 2,
            difficulty: 'medium',
            questionNumber: 5
          }
        ],
        passingMarks: 1,
        totalMarks: 2
      },
      {
        name: 'Part 3: Technology and Society',
        description: 'Discussion about technology\'s impact on society',
        duration: 5,
        questions: [
          {
            type: 'discussion',
            question: 'How has technology changed education in your country?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'medium',
            questionNumber: 6
          },
          {
            type: 'discussion',
            question: 'What are the disadvantages of modern technology?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'hard',
            questionNumber: 7
          },
          {
            type: 'discussion',
            question: 'Do you think artificial intelligence will replace human workers?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'hard',
            questionNumber: 8
          }
        ],
        passingMarks: 3,
        totalMarks: 6
      }
    ],
    scoring: {
      totalMarks: 12,
      passingMarks: 8,
      bandScoreMapping: new Map([
        [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2], [5, 2.5],
        [6, 3], [7, 3.5], [8, 4], [9, 4.5], [10, 5], [11, 5.5],
        [12, 6]
      ])
    },
    materials: [
      {
        name: 'Technology Vocabulary',
        type: 'pdf',
        url: '/materials/tech-vocabulary.pdf',
        description: 'Essential vocabulary for technology discussions'
      }
    ],
    attempts: {
      allowed: 3,
      timeBetweenAttempts: 24
    },
    settings: {
      shuffleQuestions: false,
      shuffleOptions: false,
      showResultsImmediately: false,
      showCorrectAnswers: false,
      allowReview: false,
      timer: {
        enabled: true,
        showTimer: true,
        pauseAllowed: true
      }
    },
    prerequisites: ['Intermediate English level', 'Basic technology vocabulary'],
    learningObjectives: [
      'Discuss technology-related topics fluently',
      'Use appropriate technology vocabulary',
      'Express opinions about technological impact',
      'Analyze advantages and disadvantages of technology'
    ],
    tags: ['technology', 'modern life', 'innovation', 'society'],
    difficulty: 'hard',
    status: 'published',
    isFeatured: false
  },
  {
    title: 'IELTS Speaking Practice Test 3 - Environment Focus',
    slug: 'ielts-speaking-practice-test-3',
    description: 'Speaking test focused on environmental topics and climate change. Practice discussing environmental issues and solutions.',
    type: 'speaking',
    category: 'academic',
    level: 'advanced',
    duration: 14,
    instructions: {
      general: 'This speaking test focuses on environmental topics. Be prepared to discuss climate change, pollution, and environmental protection.',
      specific: 'Use specific vocabulary related to environment and sustainability.'
    },
    sections: [
      {
        name: 'Part 1: Environmental Habits',
        description: 'Questions about environmental practices',
        duration: 5,
        questions: [
          {
            type: 'familiar_topic',
            question: 'Do you recycle? Why or why not?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 1
          },
          {
            type: 'familiar_topic',
            question: 'What do you do to protect the environment?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 2
          },
          {
            type: 'familiar_topic',
            question: 'Are environmental problems serious in your country?',
            preparationTime: 0,
            recordingTime: 60,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 3
          }
        ],
        passingMarks: 2,
        totalMarks: 3
      },
      {
        name: 'Part 2: Environmental Issue',
        description: 'Describe an environmental problem in your area',
        duration: 4,
        questions: [
          {
            type: 'cue_card',
            question: 'Describe an environmental problem in your area. You should say: what the problem is, what causes it, what effects it has, and explain what can be done to solve it.',
            preparationTime: 60,
            recordingTime: 120,
            marks: 2,
            difficulty: 'hard',
            questionNumber: 4
          }
        ],
        passingMarks: 1,
        totalMarks: 2
      },
      {
        name: 'Part 3: Global Environmental Issues',
        description: 'Discussion about global environmental challenges',
        duration: 5,
        questions: [
          {
            type: 'discussion',
            question: 'What is the most serious environmental problem today?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'hard',
            questionNumber: 5
          },
          {
            type: 'discussion',
            question: 'How can individuals help protect the environment?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'medium',
            questionNumber: 6
          },
          {
            type: 'discussion',
            question: 'What role should governments play in environmental protection?',
            preparationTime: 0,
            recordingTime: 120,
            marks: 2,
            difficulty: 'hard',
            questionNumber: 7
          }
        ],
        passingMarks: 3,
        totalMarks: 6
      }
    ],
    scoring: {
      totalMarks: 11,
      passingMarks: 7,
      bandScoreMapping: new Map([
        [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2], [5, 2.5],
        [6, 3], [7, 3.5], [8, 4], [9, 4.5], [10, 5], [11, 5.5]
      ])
    },
    materials: [
      {
        name: 'Environment Vocabulary',
        type: 'pdf',
        url: '/materials/environment-vocabulary.pdf',
        description: 'Key vocabulary for environmental discussions'
      }
    ],
    attempts: {
      allowed: 3,
      timeBetweenAttempts: 24
    },
    settings: {
      shuffleQuestions: false,
      shuffleOptions: false,
      showResultsImmediately: false,
      showCorrectAnswers: false,
      allowReview: false,
      timer: {
        enabled: true,
        showTimer: true,
        pauseAllowed: true
      }
    },
    prerequisites: ['Advanced English level', 'Environmental awareness'],
    learningObjectives: [
      'Discuss environmental issues confidently',
      'Use specific environmental vocabulary',
      'Analyze causes and effects of environmental problems',
      'Propose solutions to environmental challenges'
    ],
    tags: ['environment', 'climate change', 'sustainability', 'pollution'],
    difficulty: 'hard',
    status: 'published',
    isFeatured: false
  }
];

// Function to insert sample speaking tests
async function insertSampleSpeakingTests() {
  try {
    // Clear existing speaking tests
    await PracticeTest.deleteMany({ type: 'speaking' });
    
    // Insert new sample tests
    const insertedTests = await PracticeTest.insertMany(sampleSpeakingTests);
    
    console.log(`Successfully inserted ${insertedTests.length} speaking tests`);
    return insertedTests;
  } catch (error) {
    console.error('Error inserting sample speaking tests:', error);
    throw error;
  }
}

// Export for use in other scripts
module.exports = {
  sampleSpeakingTests,
  insertSampleSpeakingTests
};

// Run if called directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lexicon-academy')
    .then(() => {
      console.log('Connected to MongoDB');
      return insertSampleSpeakingTests();
    })
    .then(() => {
      console.log('Sample speaking tests inserted successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}
