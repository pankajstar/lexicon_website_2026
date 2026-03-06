import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SpeakingTestRecorder from '../../components/SpeakingTestRecorder'
import { Mic, Clock, Users, Star, CheckCircle, AlertCircle } from 'lucide-react'

const speakingTestQuestions = [
  {
    id: 1,
    part: 1,
    question: "What is your full name?",
    preparationTime: 0,
    recordingTime: 30,
    type: "introduction"
  },
  {
    id: 2,
    part: 1,
    question: "Where are you from?",
    preparationTime: 0,
    recordingTime: 30,
    type: "introduction"
  },
  {
    id: 3,
    part: 1,
    question: "Do you work or are you a student?",
    preparationTime: 0,
    recordingTime: 30,
    type: "introduction"
  },
  {
    id: 4,
    part: 1,
    question: "What do you like about your hometown?",
    preparationTime: 0,
    recordingTime: 60,
    type: "familiar_topic"
  },
  {
    id: 5,
    part: 1,
    question: "Is there anything you would like to change about your hometown?",
    preparationTime: 0,
    recordingTime: 60,
    type: "familiar_topic"
  },
  {
    id: 6,
    part: 2,
    question: "Describe a teacher who has influenced you in your education. You should say: who this teacher was, what subject they taught, what qualities they had, and explain how they influenced you.",
    preparationTime: 60,
    recordingTime: 120,
    type: "cue_card"
  },
  {
    id: 7,
    part: 3,
    question: "What qualities make a good teacher?",
    preparationTime: 0,
    recordingTime: 120,
    type: "discussion"
  },
  {
    id: 8,
    part: 3,
    question: "How has technology changed the way we learn?",
    preparationTime: 0,
    recordingTime: 120,
    type: "discussion"
  },
  {
    id: 9,
    part: 3,
    question: "Do you think online learning will replace traditional classrooms?",
    preparationTime: 0,
    recordingTime: 120,
    type: "discussion"
  }
]

export default function SpeakingTest() {
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [recordings, setRecordings] = useState({})
  const [testResults, setTestResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const currentQuestion = speakingTestQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / speakingTestQuestions.length) * 100

  const handleTestStart = () => {
    setTestStarted(true)
    setTestCompleted(false)
    setCurrentQuestionIndex(0)
    setRecordings({})
    setTestResults(null)
    setError('')
  }

  const handleRecordingComplete = (recordingData) => {
    setRecordings(prev => ({
      ...prev,
      [recordingData.questionNumber]: recordingData
    }))

    // Move to next question or complete test
    if (currentQuestionIndex < speakingTestQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleTestComplete()
    }
  }

  const handleTestComplete = () => {
    // Calculate test results
    const totalQuestions = speakingTestQuestions.length
    const completedQuestions = Object.keys(recordings).length
    const averageAttempts = Object.values(recordings).reduce((sum, recording) => sum + recording.attempts, 0) / completedQuestions
    const totalRecordingTime = Object.values(recordings).reduce((sum, recording) => sum + recording.duration, 0)

    const results = {
      totalQuestions,
      completedQuestions,
      averageAttempts: averageAttempts.toFixed(1),
      totalRecordingTime,
      completionRate: (completedQuestions / totalQuestions) * 100,
      partBreakdown: {
        part1: Object.values(recordings).filter(r => speakingTestQuestions.find(q => q.id === parseInt(Object.keys(recordings).find(k => recordings[k] === r)))?.part === 1).length,
        part2: Object.values(recordings).filter(r => speakingTestQuestions.find(q => q.id === parseInt(Object.keys(recordings).find(k => recordings[k] === r)))?.part === 2).length,
        part3: Object.values(recordings).filter(r => speakingTestQuestions.find(q => q.id === parseInt(Object.keys(recordings).find(k => recordings[k] === r)))?.part === 3).length
      },
      estimatedBandScore: calculateEstimatedBandScore(completedQuestions, averageAttempts, totalRecordingTime)
    }

    setTestResults(results)
    setTestCompleted(true)
  }

  const calculateEstimatedBandScore = (completedQuestions, avgAttempts, totalTime) => {
    // Simple estimation based on completion and attempts
    let score = 6.0 // Base score

    // Adjust for completion rate
    if (completedQuestions === speakingTestQuestions.length) {
      score += 1.0
    } else if (completedQuestions >= speakingTestQuestions.length * 0.8) {
      score += 0.5
    }

    // Adjust for average attempts (lower is better)
    if (avgAttempts <= 1.5) {
      score += 0.5
    } else if (avgAttempts >= 2.5) {
      score -= 0.5
    }

    // Adjust for total speaking time
    const avgTimePerQuestion = totalTime / completedQuestions
    if (avgTimePerQuestion >= 60) {
      score += 0.5
    } else if (avgTimePerQuestion < 30) {
      score -= 0.5
    }

    return Math.min(9.0, Math.max(0.0, score)).toFixed(1)
  }

  const uploadRecordings = async () => {
    setIsLoading(true)
    setError('')

    try {
      // In a real application, you would upload the audio blobs to your server
      const formData = new FormData()
      
      Object.entries(recordings).forEach(([questionId, recording]) => {
        formData.append(`recording_${questionId}`, recording.blob, `question_${questionId}.webm`)
        formData.append(`duration_${questionId}`, recording.duration)
        formData.append(`attempts_${questionId}`, recording.attempts)
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      alert('Your speaking test has been submitted successfully!')
      
    } catch (err) {
      setError('Failed to submit your test. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  if (!testStarted && !testCompleted) {
    return (
      <>
        <Head>
          <title>IELTS Speaking Practice Test - Lexicon Academy</title>
          <meta name="description" content="Practice IELTS speaking test with real-time recording and feedback. Improve your speaking skills with our comprehensive practice tests." />
        </Head>

        <div className="min-h-screen">
          <Navbar />

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Mic className="w-8 h-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900">IELTS Speaking Practice Test</h1>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Duration</h3>
                    <p className="text-gray-600">11-14 minutes</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Parts</h3>
                    <p className="text-gray-600">3 parts</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Questions</h3>
                    <p className="text-gray-600">{speakingTestQuestions.length} questions</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Test Structure</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Part 1: Introduction and Interview</h4>
                      <p className="text-gray-600">4-5 minutes • General questions about yourself</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Part 2: Individual Long Turn</h4>
                      <p className="text-gray-600">3-4 minutes • Speak for 1-2 minutes on a topic card</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Part 3: Two-way Discussion</h4>
                      <p className="text-gray-600">4-5 minutes • Discussion related to Part 2 topic</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Technical Requirements</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Working microphone with clear audio quality</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Quiet environment for recording</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Stable internet connection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Chrome or Firefox browser recommended</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleTestStart}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Mic className="w-5 h-5" />
                    <span>Start Speaking Test</span>
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

  if (testCompleted && testResults) {
    return (
      <>
        <Head>
          <title>Speaking Test Results - Lexicon Academy</title>
        </Head>

        <div className="min-h-screen">
          <Navbar />

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Speaking Test Results</h1>
                
                {/* Score Summary */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{testResults.estimatedBandScore}</div>
                  <div className="text-2xl font-semibold mb-4">Estimated IELTS Band Score</div>
                  <p className="text-gray-600">
                    You completed {testResults.completedQuestions} out of {testResults.totalQuestions} questions
                  </p>
                  <p className="text-gray-600">
                    Total speaking time: {formatTime(testResults.totalRecordingTime)}
                  </p>
                </div>

                {/* Performance Breakdown */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-800 mb-4">Test Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Part 1 Questions:</span>
                        <span className="font-semibold">{testResults.partBreakdown.part1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Part 2 Questions:</span>
                        <span className="font-semibold">{testResults.partBreakdown.part2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Part 3 Questions:</span>
                        <span className="font-semibold">{testResults.partBreakdown.part3}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Attempts:</span>
                        <span className="font-semibold">{testResults.averageAttempts}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-green-800 mb-4">Performance Analysis</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Completion Rate:</span>
                        <span className="font-semibold">{testResults.completionRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Time/Question:</span>
                        <span className="font-semibold">
                          {formatTime(Math.floor(testResults.totalRecordingTime / testResults.completedQuestions))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Recording:</span>
                        <span className="font-semibold">{formatTime(testResults.totalRecordingTime)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold mb-4">Feedback & Recommendations</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Your responses have been recorded and will be evaluated by our expert trainers.</p>
                    <p>• Focus on speaking fluently and maintaining coherence in your answers.</p>
                    <p>• Try to use a wider range of vocabulary and grammatical structures.</p>
                    <p>• Practice speaking on various topics to improve your confidence.</p>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={uploadRecordings}
                    disabled={isLoading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Submitting...' : 'Submit for Evaluation'}
                  </button>
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
        <title>Speaking Test in Progress - Lexicon Academy</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Test Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">IELTS Speaking Test</h1>
                <div className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {speakingTestQuestions.length}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 rounded-full h-3 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="mt-2 text-sm text-gray-600">
                Progress: {Math.round(progress)}%
              </div>
            </div>

            {/* Part Indicator */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentQuestion.part === 1 ? 'bg-blue-100 text-blue-800' :
                  currentQuestion.part === 2 ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  Part {currentQuestion.part}
                </div>
                <div className="text-sm text-gray-600">
                  {currentQuestion.part === 1 ? 'Introduction & Interview' :
                   currentQuestion.part === 2 ? 'Individual Long Turn' :
                   'Two-way Discussion'}
                </div>
              </div>
            </div>

            {/* Speaking Test Recorder */}
            <SpeakingTestRecorder
              question={currentQuestion.question}
              questionNumber={currentQuestion.id}
              onRecordingComplete={handleRecordingComplete}
              preparationTime={currentQuestion.preparationTime}
              recordingTime={currentQuestion.recordingTime}
              maxRetries={3}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
