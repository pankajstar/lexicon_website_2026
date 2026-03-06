import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ListeningTestPlayer from '../../components/ListeningTestPlayer'
import { Clock, Users, Star, PlayCircle } from 'lucide-react'

const mockListeningTest = {
  id: 'listening-test-1',
  title: 'IELTS Listening Practice Test 1',
  type: 'listening',
  duration: 30,
  audioUrl: '/audio/listening-test-1.mp3',
  transcript: `Narrator: You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and questions and you will have a chance to check your work. All the recordings will be played once only. The test is in four sections. Write all your answers on the question paper. At the end of the test, you will have 10 minutes to transfer your answers to the answer sheet. Now turn to Section 1.

Section 1: You will hear a conversation between a customer and a rental agent. First, you have some time to look at questions 1 to 5.

[20 seconds]

Now listen carefully and answer questions 1 to 5.

Agent: Good morning, City Rentals. How can I help you?

Customer: Hi, I'm calling about the apartment for rent on Oak Street.

Agent: Oh yes, the one-bedroom apartment. It's still available. Are you interested in viewing it?

Customer: Yes, I am. Could you tell me a bit more about it first?

Agent: Of course. It's on the third floor of a modern building with elevator access. The apartment gets plenty of natural light and has a balcony overlooking the park.

Customer: That sounds nice. What's the rent?

Agent: It's $1,200 per month, plus utilities. The deposit is equal to one month's rent.

Customer: Okay. When would I be able to move in?

Agent: It's available from the first of next month. Would you like to schedule a viewing?

Customer: Yes, please. How about this Saturday afternoon?

Agent: Let me check... Yes, 2 PM would work. I'll book you in.

Customer: Great. What's the address again?

Agent: It's 245 Oak Street, Apartment 3B. The building has a blue door.

Customer: Perfect. I'll see you on Saturday at 2 PM.

Agent: Wonderful. We'll see you then.

Narrator: Before you hear the rest of the conversation, you have some time to look at questions 6 to 10.

[20 seconds]

Now listen and answer questions 6 to 10.

Customer: One more question - is parking included?

Agent: Yes, there's underground parking available for an additional $50 per month.

Customer: And what about public transportation?

Agent: The subway station is just a two-minute walk away, and there are several bus routes on the main street.

Customer: That's convenient. Are there any grocery stores nearby?

Agent: Yes, there's a supermarket across the street and a farmers' market on weekends.

Customer: Excellent. What about the neighborhood? Is it safe?

Agent: Very safe. It's a quiet residential area with many young professionals and families.

Customer: Sounds perfect. Is the apartment furnished?

Agent: It's partially furnished with basic kitchen appliances and a wardrobe in the bedroom.

Customer: That works for me. Should I bring anything to the viewing?

Agent: Just your ID and proof of income if you decide to apply.

Customer: Great. Thanks for all the information.

Agent: You're welcome. See you on Saturday!`,
  questions: [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'What type of apartment is the customer interested in?',
      options: [
        'Studio apartment',
        'One-bedroom apartment',
        'Two-bedroom apartment',
        'Three-bedroom apartment'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      type: 'short-answer',
      question: 'How much is the monthly rent?',
      correctAnswer: '$1,200'
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'Which floor is the apartment on?',
      options: [
        'First floor',
        'Second floor',
        'Third floor',
        'Fourth floor'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      type: 'true-false',
      question: 'The apartment has a balcony overlooking the park.',
      correctAnswer: 'true'
    },
    {
      id: 5,
      type: 'short-answer',
      question: 'When is the viewing scheduled for?',
      correctAnswer: 'Saturday at 2 PM'
    },
    {
      id: 6,
      type: 'short-answer',
      question: 'What is the additional cost for parking?',
      correctAnswer: '$50 per month'
    },
    {
      id: 7,
      type: 'multiple-choice',
      question: 'How far is the subway station?',
      options: [
        '1 minute walk',
        '2 minutes walk',
        '5 minutes walk',
        '10 minutes walk'
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      type: 'true-false',
      question: 'There is a supermarket across the street.',
      correctAnswer: 'true'
    },
    {
      id: 9,
      type: 'multiple-choice',
      question: 'What kind of neighborhood is it?',
      options: [
        'Busy commercial area',
        'Quiet residential area',
        'University district',
        'Industrial zone'
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      type: 'short-answer',
      question: 'What should the customer bring to the viewing?',
      correctAnswer: 'ID and proof of income'
    }
  ]
}

export default function ListeningTest() {
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  const otherTests = [
    {
      id: 'listening-test-2',
      title: 'IELTS Listening Practice Test 2',
      duration: 30,
      difficulty: 'Medium',
      questions: 40,
      attempts: 1234,
      rating: 4.5
    },
    {
      id: 'listening-test-3',
      title: 'IELTS Listening Practice Test 3',
      duration: 30,
      difficulty: 'Hard',
      questions: 40,
      attempts: 856,
      rating: 4.7
    },
    {
      id: 'listening-test-4',
      title: 'IELTS Listening Practice Test 4',
      duration: 30,
      difficulty: 'Easy',
      questions: 40,
      attempts: 2103,
      rating: 4.3
    }
  ]

  const handleTestStart = () => {
    setTestStarted(true)
    setTestCompleted(false)
    setAnswers({})
    setResults(null)
  }

  const handleTestComplete = (userAnswers) => {
    setAnswers(userAnswers)
    
    // Calculate results
    let correctCount = 0
    const detailedResults = mockListeningTest.questions.map((question, index) => {
      const userAnswer = userAnswers[index]
      const isCorrect = userAnswer === question.correctAnswer.toString()
      if (isCorrect) correctCount++
      
      return {
        questionNumber: index + 1,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer.toString(),
        isCorrect
      }
    })

    const score = (correctCount / mockListeningTest.questions.length) * 100
    const bandScore = calculateBandScore(score)

    setResults({
      score,
      correctCount,
      totalQuestions: mockListeningTest.questions.length,
      bandScore,
      detailedResults
    })
    setTestCompleted(true)
  }

  const calculateBandScore = (percentage) => {
    if (percentage >= 90) return 9.0
    if (percentage >= 85) return 8.5
    if (percentage >= 80) return 8.0
    if (percentage >= 75) return 7.5
    if (percentage >= 70) return 7.0
    if (percentage >= 65) return 6.5
    if (percentage >= 60) return 6.0
    if (percentage >= 55) return 5.5
    if (percentage >= 50) return 5.0
    if (percentage >= 45) return 4.5
    if (percentage >= 40) return 4.0
    return 3.5
  }

  if (!testStarted) {
    return (
      <>
        <Head>
          <title>IELTS Listening Practice Test - Lexicon Academy</title>
          <meta name="description" content="Practice IELTS listening tests with audio and questions. Improve your listening skills with our comprehensive practice tests." />
        </Head>

        <div className="min-h-screen">
          <Navbar />

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Test Introduction */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Headphones className="w-8 h-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900">IELTS Listening Practice Test</h1>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Duration</h3>
                    <p className="text-gray-600">30 minutes</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Questions</h3>
                    <p className="text-gray-600">40 questions</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Difficulty</h3>
                    <p className="text-gray-600">Medium</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Test Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• You will hear a number of different recordings</li>
                    <li>• Each recording will be played once only</li>
                    <li>• You will have time to read the questions before each recording</li>
                    <li>• Write your answers on the question paper</li>
                    <li>• At the end, you will have 10 minutes to transfer answers</li>
                    <li>• Use headphones for better audio quality</li>
                  </ul>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleTestStart}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>

              {/* Other Tests */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">More Listening Tests</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherTests.map((test) => (
                    <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold mb-2">{test.title}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Duration: {test.duration} minutes</p>
                        <p>Difficulty: {test.difficulty}</p>
                        <p>Questions: {test.questions}</p>
                        <p>Attempts: {test.attempts}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{test.rating}</span>
                        </div>
                      </div>
                      <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Take Test
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    )
  }

  if (testCompleted && results) {
    return (
      <>
        <Head>
          <title>Test Results - Lexicon Academy</title>
        </Head>

        <div className="min-h-screen">
          <Navbar />

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Test Results</h1>
                
                {/* Score Summary */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{results.score.toFixed(1)}%</div>
                  <div className="text-2xl font-semibold mb-4">IELTS Band Score: {results.bandScore}</div>
                  <p className="text-gray-600">
                    You got {results.correctCount} out of {results.totalQuestions} questions correct
                  </p>
                </div>

                {/* Performance Analysis */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-green-800 mb-4">Correct Answers</h3>
                    <div className="space-y-2">
                      {results.detailedResults
                        .filter(result => result.isCorrect)
                        .map(result => (
                          <div key={result.questionNumber} className="flex items-center space-x-2">
                            <span className="text-green-600">✓</span>
                            <span className="text-sm">Question {result.questionNumber}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="font-semibold text-red-800 mb-4">Incorrect Answers</h3>
                    <div className="space-y-2">
                      {results.detailedResults
                        .filter(result => !result.isCorrect)
                        .map(result => (
                          <div key={result.questionNumber} className="flex items-center space-x-2">
                            <span className="text-red-600">✗</span>
                            <span className="text-sm">Question {result.questionNumber}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleTestStart}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retake Test
                  </button>
                  <button
                    onClick={() => window.location.href = '/practice-tests'}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    More Tests
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>IELTS Listening Test in Progress - Lexicon Academy</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <ListeningTestPlayer
            test={mockListeningTest}
            onAnswerSubmit={(questionIndex, answer) => {
              setAnswers(prev => ({ ...prev, [questionIndex]: answer }))
            }}
            onComplete={handleTestComplete}
          />
        </div>

        <Footer />
      </div>
    </>
  )
}
