const mongoose = require('mongoose');
const PracticeTest = require('../backend/models/PracticeTest');

const sampleListeningTests = [
  {
    title: 'IELTS Listening Practice Test 1 - Rental Conversation',
    slug: 'ielts-listening-practice-test-1',
    description: 'Practice listening comprehension with a conversation between a customer and rental agent. This test covers typical Section 1 listening scenarios.',
    type: 'listening',
    category: 'practice',
    level: 'intermediate',
    duration: 30,
    instructions: {
      general: 'You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and questions and you will have a chance to check your work. All the recordings will be played once only.',
      specific: 'Listen to the conversation between a customer and a rental agent and answer questions 1-10.'
    },
    sections: [
      {
        name: 'Section 1',
        description: 'Conversation between customer and rental agent',
        duration: 5,
        questions: [
          {
            type: 'multiple-choice',
            question: 'What type of apartment is the customer interested in?',
            options: [
              'Studio apartment',
              'One-bedroom apartment',
              'Two-bedroom apartment',
              'Three-bedroom apartment'
            ],
            correctAnswer: 1,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 1
          },
          {
            type: 'short-answer',
            question: 'How much is the monthly rent? (Write the amount)',
            correctAnswer: '$1,200',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 2
          },
          {
            type: 'multiple-choice',
            question: 'Which floor is the apartment on?',
            options: [
              'First floor',
              'Second floor',
              'Third floor',
              'Fourth floor'
            ],
            correctAnswer: 2,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 3
          },
          {
            type: 'true-false',
            question: 'The apartment has a balcony overlooking the park.',
            correctAnswer: 'true',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 4
          },
          {
            type: 'short-answer',
            question: 'When is the viewing scheduled for?',
            correctAnswer: 'Saturday at 2 PM',
            marks: 1,
            difficulty: 'medium',
            questionNumber: 5
          },
          {
            type: 'short-answer',
            question: 'What is the additional cost for parking per month?',
            correctAnswer: '$50',
            marks: 1,
            difficulty: 'medium',
            questionNumber: 6
          },
          {
            type: 'multiple-choice',
            question: 'How far is the subway station?',
            options: [
              '1 minute walk',
              '2 minutes walk',
              '5 minutes walk',
              '10 minutes walk'
            ],
            correctAnswer: 1,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 7
          },
          {
            type: 'true-false',
            question: 'There is a supermarket across the street.',
            correctAnswer: 'true',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 8
          },
          {
            type: 'multiple-choice',
            question: 'What kind of neighborhood is it?',
            options: [
              'Busy commercial area',
              'Quiet residential area',
              'University district',
              'Industrial zone'
            ],
            correctAnswer: 1,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 9
          },
          {
            type: 'short-answer',
            question: 'What two things should the customer bring to the viewing?',
            correctAnswer: 'ID and proof of income',
            marks: 1,
            difficulty: 'hard',
            questionNumber: 10
          }
        ],
        passingMarks: 6,
        totalMarks: 10
      }
    ],
    scoring: {
      totalMarks: 10,
      passingMarks: 6,
      bandScoreMapping: new Map([
        [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2], [5, 2.5],
        [6, 3], [7, 3.5], [8, 4], [9, 4.5], [10, 5]
      ])
    },
    materials: [
      {
        name: 'Audio Recording',
        type: 'audio',
        url: '/audio/listening-test-1.mp3',
        description: 'Complete audio recording for the listening test'
      },
      {
        name: 'Transcript',
        type: 'text',
        url: '/transcripts/listening-test-1.txt',
        description: 'Full transcript of the audio recording'
      }
    ],
    attempts: {
      allowed: 3,
      timeBetweenAttempts: 24
    },
    settings: {
      shuffleQuestions: false,
      shuffleOptions: false,
      showResultsImmediately: true,
      showCorrectAnswers: true,
      allowReview: true,
      timer: {
        enabled: true,
        showTimer: true,
        pauseAllowed: false
      }
    },
    prerequisites: ['Basic English listening comprehension'],
    learningObjectives: [
      'Understand conversational English in real-life situations',
      'Extract specific information from dialogues',
      'Follow the flow of conversation between multiple speakers',
      'Identify key details about accommodation and services'
    ],
    tags: ['accommodation', 'rental', 'conversation', 'section1'],
    difficulty: 'medium',
    status: 'published',
    isFeatured: true
  },
  {
    title: 'IELTS Listening Practice Test 2 - University Lecture',
    slug: 'ielts-listening-practice-test-2',
    description: 'Practice listening to an academic lecture about environmental science. This test simulates Section 4 of the IELTS listening test.',
    type: 'listening',
    category: 'academic',
    level: 'advanced',
    duration: 30,
    instructions: {
      general: 'You will hear a university lecture on environmental science. Answer questions 1-10 based on the information provided.',
      specific: 'Listen carefully to the lecture and take notes as needed. The lecture will be played once only.'
    },
    sections: [
      {
        name: 'Section 4',
        description: 'University lecture on environmental science',
        duration: 10,
        questions: [
          {
            type: 'multiple-choice',
            question: 'What is the main topic of the lecture?',
            options: [
              'Climate change effects on agriculture',
              'Renewable energy sources',
              'Urban pollution control',
              'Ocean acidification'
            ],
            correctAnswer: 0,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 1
          },
          {
            type: 'short-answer',
            question: 'Which gas is primarily responsible for global warming?',
            correctAnswer: 'Carbon dioxide',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 2
          },
          {
            type: 'multiple-choice',
            question: 'By how much did global temperatures increase in the last century?',
            options: [
              '0.5 degrees Celsius',
              '1 degree Celsius',
              '1.5 degrees Celsius',
              '2 degrees Celsius'
            ],
            correctAnswer: 1,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 3
          },
          {
            type: 'true-false',
            question: 'The lecturer believes that individual actions cannot make a difference.',
            correctAnswer: 'false',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 4
          },
          {
            type: 'short-answer',
            question: 'What percentage of global emissions comes from transportation?',
            correctAnswer: '23%',
            marks: 1,
            difficulty: 'hard',
            questionNumber: 5
          },
          {
            type: 'multiple-choice',
            question: 'Which renewable energy source does the lecturer consider most promising?',
            options: [
              'Solar power',
              'Wind energy',
              'Hydroelectric power',
              'Geothermal energy'
            ],
            correctAnswer: 0,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 6
          },
          {
            type: 'short-answer',
            question: 'What is the term for capturing and storing carbon dioxide?',
            correctAnswer: 'Carbon capture',
            marks: 1,
            difficulty: 'hard',
            questionNumber: 7
          },
          {
            type: 'true-false',
            question: 'The Paris Agreement aims to limit warming to 2 degrees Celsius.',
            correctAnswer: 'true',
            marks: 1,
            difficulty: 'medium',
            questionNumber: 8
          },
          {
            type: 'multiple-choice',
            question: 'What does the lecturer suggest is the biggest obstacle to progress?',
            options: [
              'Lack of technology',
              'Economic costs',
              'Political will',
              'Public awareness'
            ],
            correctAnswer: 2,
            marks: 1,
            difficulty: 'hard',
            questionNumber: 9
          },
          {
            type: 'short-answer',
            question: 'What two areas does the lecturer say need immediate action?',
            correctAnswer: 'Energy and transportation',
            marks: 1,
            difficulty: 'hard',
            questionNumber: 10
          }
        ],
        passingMarks: 6,
        totalMarks: 10
      }
    ],
    scoring: {
      totalMarks: 10,
      passingMarks: 6,
      bandScoreMapping: new Map([
        [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2], [5, 2.5],
        [6, 3], [7, 3.5], [8, 4], [9, 4.5], [10, 5]
      ])
    },
    materials: [
      {
        name: 'Lecture Audio',
        type: 'audio',
        url: '/audio/listening-test-2.mp3',
        description: 'University lecture recording'
      },
      {
        name: 'Lecture Slides',
        type: 'pdf',
        url: '/materials/listening-test-2-slides.pdf',
        description: 'Visual aids from the lecture'
      }
    ],
    attempts: {
      allowed: 3,
      timeBetweenAttempts: 24
    },
    settings: {
      shuffleQuestions: false,
      shuffleOptions: false,
      showResultsImmediately: true,
      showCorrectAnswers: true,
      allowReview: true,
      timer: {
        enabled: true,
        showTimer: true,
        pauseAllowed: false
      }
    },
    prerequisites: ['Academic English vocabulary', 'Note-taking skills'],
    learningObjectives: [
      'Understand academic lectures on scientific topics',
      'Extract main ideas and supporting details',
      'Follow complex arguments and explanations',
      'Identify specific data and statistics'
    ],
    tags: ['academic', 'lecture', 'environment', 'science', 'section4'],
    difficulty: 'hard',
    status: 'published',
    isFeatured: true
  },
  {
    title: 'IELTS Listening Practice Test 3 - Travel Information',
    slug: 'ielts-listening-practice-test-3',
    description: 'Practice listening to travel information and directions. This test covers Sections 2 and 3 of the IELTS listening test.',
    type: 'listening',
    category: 'general',
    level: 'intermediate',
    duration: 30,
    instructions: {
      general: 'You will hear two recordings about travel information. Answer questions 1-10 based on what you hear.',
      specific: 'Section 2: Travel agency information. Section 3: Students discussing travel plans.'
    },
    sections: [
      {
        name: 'Section 2',
        description: 'Travel agency information about tour packages',
        duration: 5,
        questions: [
          {
            type: 'multiple-choice',
            question: 'What type of tour is being advertised?',
            options: [
              'Beach holiday',
              'Mountain trekking',
              'City tour',
              'Wildlife safari'
            ],
            correctAnswer: 2,
            marks: 1,
            difficulty: 'easy',
            questionNumber: 1
          },
          {
            type: 'short-answer',
            question: 'How long is the city tour?',
            correctAnswer: '3 hours',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 2
          },
          {
            type: 'multiple-choice',
            question: 'What is included in the tour price?',
            options: [
              'Transport only',
              'Transport and guide',
              'Transport, guide, and lunch',
              'All meals and entrance fees'
            ],
            correctAnswer: 2,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 3
          },
          {
            type: 'short-answer',
            question: 'What time does the morning tour start?',
            correctAnswer: '9 AM',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 4
          },
          {
            type: 'true-false',
            question: 'The tour includes a visit to the museum.',
            correctAnswer: 'true',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 5
          }
        ],
        passingMarks: 3,
        totalMarks: 5
      },
      {
        name: 'Section 3',
        description: 'Students discussing their travel plans',
        duration: 5,
        questions: [
          {
            type: 'multiple-choice',
            question: 'Where are the students planning to go?',
            options: [
              'Paris',
              'Rome',
              'Barcelona',
              'Amsterdam'
            ],
            correctAnswer: 1,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 6
          },
          {
            type: 'short-answer',
            question: 'How long is their trip?',
            correctAnswer: 'One week',
            marks: 1,
            difficulty: 'easy',
            questionNumber: 7
          },
          {
            type: 'true-false',
            question: 'They have booked their flights already.',
            correctAnswer: 'false',
            marks: 1,
            difficulty: 'medium',
            questionNumber: 8
          },
          {
            type: 'multiple-choice',
            question: 'What is their main concern about the trip?',
            options: [
              'Weather',
              'Budget',
              'Language barrier',
              'Accommodation'
            ],
            correctAnswer: 1,
            marks: 1,
            difficulty: 'medium',
            questionNumber: 9
          },
          {
            type: 'short-answer',
            question: 'What two activities do they want to do most?',
            correctAnswer: 'Sightseeing and shopping',
            marks: 1,
            difficulty: 'hard',
            questionNumber: 10
          }
        ],
        passingMarks: 3,
        totalMarks: 5
      }
    ],
    scoring: {
      totalMarks: 10,
      passingMarks: 6,
      bandScoreMapping: new Map([
        [0, 0], [1, 0.5], [2, 1], [3, 1.5], [4, 2], [5, 2.5],
        [6, 3], [7, 3.5], [8, 4], [9, 4.5], [10, 5]
      ])
    },
    materials: [
      {
        name: 'Travel Information Audio',
        type: 'audio',
        url: '/audio/listening-test-3.mp3',
        description: 'Travel information recordings'
      }
    ],
    attempts: {
      allowed: 3,
      timeBetweenAttempts: 24
    },
    settings: {
      shuffleQuestions: false,
      shuffleOptions: false,
      showResultsImmediately: true,
      showCorrectAnswers: true,
      allowReview: true,
      timer: {
        enabled: true,
        showTimer: true,
        pauseAllowed: false
      }
    },
    prerequisites: ['Basic travel vocabulary', 'Understanding directions'],
    learningObjectives: [
      'Understand travel-related information',
      'Follow directions and instructions',
      'Extract specific details about services',
      'Understand conversational exchanges'
    ],
    tags: ['travel', 'directions', 'information', 'section2', 'section3'],
    difficulty: 'medium',
    status: 'published',
    isFeatured: false
  }
];

// Function to insert sample data
async function insertSampleListeningTests() {
  try {
    // Clear existing listening tests
    await PracticeTest.deleteMany({ type: 'listening' });
    
    // Insert new sample tests
    const insertedTests = await PracticeTest.insertMany(sampleListeningTests);
    
    console.log(`Successfully inserted ${insertedTests.length} listening tests`);
    return insertedTests;
  } catch (error) {
    console.error('Error inserting sample listening tests:', error);
    throw error;
  }
}

// Export for use in other scripts
module.exports = {
  sampleListeningTests,
  insertSampleListeningTests
};

// Run if called directly
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lexicon-academy')
    .then(() => {
      console.log('Connected to MongoDB');
      return insertSampleListeningTests();
    })
    .then(() => {
      console.log('Sample listening tests inserted successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}
