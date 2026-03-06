import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import AudioPlayer from '../../../components/AudioPlayer'
import { Clock, Users, Star, AlertCircle, CheckCircle } from 'lucide-react'

export default function ListeningTestPage() {
  const router = useRouter()
  const { testId } = router.query
  
  const [test, setTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)
  const [results, setResults] = useState(null)

  // Mock test data - in real app, this would come from API
  const mockTest = {
    id: testId,
    title: 'IELTS Listening Practice Test - Complete Test',
    type: 'listening',
    duration: 30,
    sections: [
      {
        name: 'Section 1',
        description: 'Conversation between customer and rental agent',
        duration: 5,
        audioUrl: '/audio/section1.mp3',
        transcript: `Narrator: You will hear a conversation between a customer and a rental agent...`,
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'What type of apartment is the customer interested in?',
            options: ['Studio', 'One-bedroom', 'Two-bedroom', 'Three-bedroom'],
            correctAnswer: 1
          },
          {
            id: 2,
            type: 'short-answer',
            question: 'How much is the monthly rent?',
            correctAnswer: '$1,200'
          }
        ]
      },
      {
        name: 'Section 2',
        description: 'Travel information about city tours',
        duration: 5,
        audioUrl: '/audio/section2.mp3',
        transcript: `Narrator: You will hear a travel agent talking about city tours...`,
        questions: [
          {
            id: 3,
            type: 'multiple-choice',
            question: 'What time does the morning tour start?',
            options: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
            correctAnswer: 1
          },
          {
            id: 4,
            type: 'true-false',
            question: 'The tour includes lunch.',
            correctAnswer: 'true'
          }
        ]
      }
    ]
  }

  useEffect(() => {
    if (testId) {
      // In real app, fetch test data from API
      setTest(mockTest)
      setLoading(false)
    }
  }, [testId])

  useEffect(() => {
    let timer
    if (testStarted && !testCompleted && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && testStarted) {
      handleSubmitTest()
    }
    return () => clearTimeout(timer)
  }, [testStarted, testCompleted, timeRemaining])

  const handleTestStart = () => {
    setTestStarted(true)
    setTimeRemaining(test.duration * 60) // Convert minutes to seconds
    setTestCompleted(false)
    setAnswers({})
    setCurrentSection(0)
    setCurrentQuestion(0)
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNextQuestion = () => {
    const currentSectionData = test.sections[currentSection]
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else if (currentSection < test.sections.length - 1) {
      setCurrentSection(prev => prev + 1)
      setCurrentQuestion(0)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
      setCurrentQuestion(test.sections[currentSection - 1].questions.length - 1)
    }
  }

  const handleSubmitTest = () => {
    // Calculate results
    let correctCount = 0
    const totalQuestions = test.sections.reduce((acc, section) => acc + section.questions.length, 0)
    
    test.sections.forEach(section => {
      section.questions.forEach(question => {
        if (answers[question.id] === question.correctAnswer.toString()) {
          correctCount++
        }
      })
    })

    const score = (correctCount / totalQuestions) * 100
    const bandScore = calculateBandScore(score)

    setResults({
      score,
      correctCount,
      totalQuestions,
      bandScore,
      timeSpent: (test.duration * 60 - timeRemaining) / 60 // in minutes
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getCurrentQuestion = () => {
    if (!test) return null
    return test.sections[currentSection].questions[currentQuestion]
  }

  const getProgress = () => {
    if (!test) return 0
    const totalQuestions = test.sections.reduce((acc, section) => acc + section.questions.length, 0)
    const answeredQuestions = Object.keys(answers).length
    return (answeredQuestions / totalQuestions) * 100
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!testStarted && !testCompleted) {
    return (
      <>
        <Head>
          <title>{test.title} - Lexicon Academy</title>
        </Head>

        <div className="min-h-screen">
          <Navbar />

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6">{test.title}</h1>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Duration</h3>
                    <p className="text-gray-600">{test.duration} minutes</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Questions</h3>
                    <p className="text-gray-600">
                      {test.sections.reduce((acc, section) => acc + section.questions.length, 0)} questions
                    </p>
                  </div>
                  <div className="text-center">
                    <Star className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Sections</h3>
                    <p className="text-gray-600">{test.sections.length} sections</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Test Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• You will hear {test.sections.length} different recordings</li>
                    <li>• Each recording will be played once only</li>
                    <li>• You will have time to read the questions before each recording</li>
                    <li>• Write your answers as you listen</li>
                    <li>• You can review your answers before submitting</li>
                    <li>• Use headphones for better audio quality</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Test Sections</h3>
                  <div className="space-y-4">
                    {test.sections.map((section, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{section.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{section.description}</p>
                        <p className="text-sm text-gray-500">
                          Duration: {section.duration} minutes | 
                          Questions: {section.questions.length}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleTestStart}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Test
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
                
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{results.score.toFixed(1)}%</div>
                  <div className="text-2xl font-semibold mb-4">IELTS Band Score: {results.bandScore}</div>
                  <p className="text-gray-600">
                    You got {results.correctCount} out of {results.totalQuestions} questions correct
                  </p>
                  <p className="text-gray-600">
                    Time taken: {results.timeSpent.toFixed(1)} minutes
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-green-800 mb-4">Performance Analysis</h3>
                    <div className="space-y-2">
                      <p className="text-sm">Excellent performance! Keep up the good work.</p>
                      <p className="text-sm">Your listening skills are well-developed.</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-800 mb-4">Recommendations</h3>
                    <div className="space-y-2">
                      <p className="text-sm">Continue practicing with different accents</p>
                      <p className="text-sm">Focus on understanding faster speech</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleTestStart}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retake Test
                  </button>
                  <button
                    onClick={() => router.push('/practice-tests')}
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

  const currentQ = getCurrentQuestion()

  return (
    <>
      <Head>
        <title>Test in Progress - Lexicon Academy</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Test Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{test.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-semibold">
                    Time: {formatTime(timeRemaining)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Progress: {Math.round(getProgress())}%
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 rounded-full h-3 transition-all duration-300"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            </div>

            {/* Audio Player */}
            <div className="mb-6">
              <AudioPlayer
                audioUrl={test.sections[currentSection].audioUrl}
                transcript={test.sections[currentSection].transcript}
                showTranscript={showTranscript}
              />
            </div>

            {/* Question */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {test.sections[currentSection].name}
                    </span>
                    <h2 className="text-xl font-semibold">
                      Question {currentQuestion + 1} of {test.sections[currentSection].questions.length}
                    </h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      {showTranscript ? 'Hide' : 'Show'} Transcript
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{currentQ.question}</p>
              </div>

              {/* Answer Options */}
              <div className="mb-6">
                {currentQ.type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name={`question-${currentQ.id}`}
                          value={option}
                          checked={answers[currentQ.id] === option}
                          onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQ.type === 'short-answer' && (
                  <input
                    type="text"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}

                {currentQ.type === 'true-false' && (
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value="true"
                        checked={answers[currentQ.id] === 'true'}
                        onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>True</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value="false"
                        checked={answers[currentQ.id] === 'false'}
                        onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>False</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentSection === 0 && currentQuestion === 0}
                  className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                
                {currentSection === test.sections.length - 1 && 
                 currentQuestion === test.sections[currentSection].questions.length - 1 ? (
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
