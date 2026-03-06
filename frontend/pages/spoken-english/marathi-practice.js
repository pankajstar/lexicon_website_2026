import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SpeakingTestRecorder from '../../components/SpeakingTestRecorder'
import { 
  Volume2, 
  BookOpen, 
  Users, 
  Globe, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Mic,
  Clock,
  Star
} from 'lucide-react'

const marathiToEnglishExercises = {
  basicPhrases: [
    {
      marathi: 'नमस्कार',
      english: 'Hello',
      pronunciation: 'Namaskar',
      category: 'greetings',
      difficulty: 'easy'
    },
    {
      marathi: 'तुम्ही कसे आहात?',
      english: 'How are you?',
      pronunciation: 'Tumhi kase ahat?',
      category: 'greetings',
      difficulty: 'easy'
    },
    {
      marathi: 'मी ठीक आहे',
      english: 'I am fine',
      pronunciation: 'Me theek aahe',
      category: 'responses',
      difficulty: 'easy'
    },
    {
      marathi: 'धन्यवाद',
      english: 'Thank you',
      pronunciation: 'Dhanyavad',
      category: 'politeness',
      difficulty: 'easy'
    },
    {
      marathi: 'कृपया',
      english: 'Please',
      pronunciation: 'Krupaya',
      category: 'politeness',
      difficulty: 'easy'
    }
  ],
  dailyConversation: [
    {
      marathi: 'आज हवामान कसा आहे?',
      english: 'How is the weather today?',
      pronunciation: 'Aaj havaman kasa aahe?',
      category: 'weather',
      difficulty: 'medium'
    },
    {
      marathi: 'मला भूक लागली आहे',
      english: 'I am hungry',
      pronunciation: 'Mala bhuk lagali aahe',
      category: 'daily_needs',
      difficulty: 'medium'
    },
    {
      marathi: 'किती वाजले आहे?',
      english: 'What time is it?',
      pronunciation: 'Kiti wajale aahe?',
      category: 'time',
      difficulty: 'medium'
    },
    {
      marathi: 'मी ऑफिसला जात आहे',
      english: 'I am going to office',
      pronunciation: 'Me office la jaat aahe',
      category: 'work',
      difficulty: 'medium'
    }
  ],
  advancedPhrases: [
    {
      marathi: 'मला इंग्रजी शिकायला आवडते',
      english: 'I like to learn English',
      pronunciation: 'Mala English shikayala avadate',
      category: 'learning',
      difficulty: 'hard'
    },
    {
      marathi: 'काल मी बाजारला गेलो होतो',
      english: 'Yesterday I went to market',
      pronunciation: 'Kaal me bazaarla gelo hota',
      category: 'past_tense',
      difficulty: 'hard'
    },
    {
      marathi: 'उद्यानात फुलं बहर आहेत',
      english: 'There are many flowers in the garden',
      pronunciation: 'Udyanat phun bahar aahet',
      category: 'descriptions',
      difficulty: 'hard'
    }
  ]
}

const conversationScenarios = [
  {
    id: 1,
    title: 'At the Restaurant',
    marathi: 'हॉटेलमध्ये',
    english: 'At the Restaurant',
    difficulty: 'medium',
    dialogues: [
      {
        marathi: 'वेटर, मेनू द्या',
        english: 'Waiter, give me the menu',
        pronunciation: 'Waiter, menu dya'
      },
      {
        marathi: 'मला चहा आणि स्नॅक्स हवे आहे',
        english: 'I want tea and snacks',
        pronunciation: 'Mala chai ani snacks have aahe'
      },
      {
        marathi: 'बिल किती आहे?',
        english: 'How much is the bill?',
        pronunciation: 'Bill kiti aahe?'
      }
    ]
  },
  {
    id: 2,
    title: 'Job Interview',
    marathi: 'इंटरव्ह्यू',
    english: 'Job Interview',
    difficulty: 'hard',
    dialogues: [
      {
        marathi: 'आपले स्वतःबद्दल सांगा',
        english: 'Tell me about yourself',
        pronunciation: 'Aaple swatabaddal sanga'
      },
      {
        marathi: 'माझा अनुभव वर्षांचा आहे',
        english: 'I have years of experience',
        pronunciation: 'Mazha anubhav varshancha aahe'
      },
      {
        marathi: 'मी ही नोकरी करू इच्छितो',
        english: 'I want to do this job',
        pronunciation: 'Me hi nokri karu ichhito'
      }
    ]
  },
  {
    id: 3,
    title: 'Medical Emergency',
    marathi: 'आरोग्य संबंधी',
    english: 'Medical Emergency',
    difficulty: 'hard',
    dialogues: [
      {
        marathi: 'मला ताप आला आहे',
        english: 'I have fever',
        pronunciation: 'Mala tap aala aahe'
      },
      {
        marathi: 'डॉक्टर, माझा तपासा करा',
        english: 'Doctor, please check me',
        pronunciation: 'Doctor, maja tapasa kara'
      },
      {
        marathi: 'मला औषधे द्या',
        english: 'Give me medicine',
        pronunciation: 'Mala aushadye dya'
      }
    ]
  }
]

export default function MarathiToEnglishPractice() {
  const [activeTab, setActiveTab] = useState('phrases')
  const [selectedCategory, setSelectedCategory] = useState('basic')
  const [currentExercise, setCurrentExercise] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [userRecording, setUserRecording] = useState(null)
  const [progress, setProgress] = useState({})
  const [completedExercises, setCompletedExercises] = useState(new Set())
  const [isRecording, setIsRecording] = useState(false)

  const getCurrentExercises = () => {
    switch (selectedCategory) {
      case 'basic':
        return marathiToEnglishExercises.basicPhrases
      case 'daily':
        return marathiToEnglishExercises.dailyConversation
      case 'advanced':
        return marathiToEnglishExercises.advancedPhrases
      default:
        return marathiToEnglishExercises.basicPhrases
    }
  }

  const exercises = getCurrentExercises()
  const currentExerciseData = exercises[currentExercise]

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1)
      setShowTranslation(false)
      setUserRecording(null)
    }
  }

  const handlePrevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1)
      setShowTranslation(false)
      setUserRecording(null)
    }
  }

  const handleRecordingComplete = (recording) => {
    setUserRecording(recording)
    setCompletedExercises(prev => new Set([...prev, currentExercise]))
    
    // Update progress
    const categoryProgress = progress[selectedCategory] || []
    if (!categoryProgress.includes(currentExercise)) {
      setProgress(prev => ({
        ...prev,
        [selectedCategory]: [...categoryProgress, currentExercise]
      }))
    }
  }

  const playAudio = (text, lang = 'en') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === 'mr' ? 'mr-IN' : 'en-US'
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const getCategoryProgress = () => {
    const categoryProgress = progress[selectedCategory] || []
    return Math.round((categoryProgress.length / exercises.length) * 100)
  }

  const resetProgress = () => {
    setProgress({})
    setCompletedExercises(new Set())
    setCurrentExercise(0)
  }

  return (
    <>
      <Head>
        <title>Marathi to English Practice - Lexicon Academy</title>
        <meta name="description" content="Learn English from Marathi with our comprehensive practice exercises. Perfect for Marathi speakers to improve their English speaking skills." />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">Marathi to English Practice</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn English through Marathi with our interactive practice exercises designed specifically for Marathi speakers
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Total Exercises</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {marathiToEnglishExercises.basicPhrases.length + 
                   marathiToEnglishExercises.dailyConversation.length + 
                   marathiToEnglishExercises.advancedPhrases.length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Completed</h3>
                <p className="text-2xl font-bold text-green-600">{completedExercises.size}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Star className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold">Current Progress</h3>
                <p className="text-2xl font-bold text-yellow-600">{getCategoryProgress()}%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Active Learners</h3>
                <p className="text-2xl font-bold text-purple-600">1,234</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('phrases')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'phrases'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Phrase Practice
                  </button>
                  <button
                    onClick={() => setActiveTab('conversation')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'conversation'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Conversation Scenarios
                  </button>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'progress'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Progress Tracking
                  </button>
                </nav>
              </div>

              {/* Phrase Practice Tab */}
              {activeTab === 'phrases' && (
                <div className="p-6">
                  {/* Category Selection */}
                  <div className="flex justify-center space-x-4 mb-8">
                    <button
                      onClick={() => setSelectedCategory('basic')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedCategory === 'basic'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Basic Phrases
                    </button>
                    <button
                      onClick={() => setSelectedCategory('daily')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedCategory === 'daily'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Daily Conversation
                    </button>
                    <button
                      onClick={() => setSelectedCategory('advanced')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedCategory === 'advanced'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Advanced Phrases
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress: {currentExercise + 1} of {exercises.length}</span>
                      <span>{getCategoryProgress()}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 rounded-full h-3 transition-all duration-300"
                        style={{ width: `${getCategoryProgress()}%` }}
                      />
                    </div>
                  </div>

                  {currentExerciseData && (
                    <div className="space-y-6">
                      {/* Exercise Card */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
                        <div className="text-center mb-6">
                          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {currentExerciseData.category.replace('_', ' ').toUpperCase()}
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {currentExerciseData.marathi}
                          </h2>
                          <p className="text-lg text-gray-600 mb-4">
                            Pronunciation: {currentExerciseData.pronunciation}
                          </p>
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={() => playAudio(currentExerciseData.marathi, 'mr')}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                            >
                              <Volume2 className="w-4 h-4" />
                              <span>Hear Marathi</span>
                            </button>
                            <button
                              onClick={() => playAudio(currentExerciseData.english, 'en')}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                            >
                              <Volume2 className="w-4 h-4" />
                              <span>Hear English</span>
                            </button>
                          </div>
                        </div>

                        {/* Translation Toggle */}
                        <div className="text-center mb-6">
                          <button
                            onClick={() => setShowTranslation(!showTranslation)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {showTranslation ? 'Hide' : 'Show'} Translation
                          </button>
                        </div>

                        {/* English Translation */}
                        {showTranslation && (
                          <div className="bg-white rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {currentExerciseData.english}
                            </h3>
                            <p className="text-gray-600">Practice saying this phrase in English</p>
                          </div>
                        )}
                      </div>

                      {/* Speaking Practice */}
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Speaking Practice</h3>
                        <SpeakingTestRecorder
                          question={`Please say: "${currentExerciseData.english}"`}
                          questionNumber={currentExercise + 1}
                          onRecordingComplete={handleRecordingComplete}
                          preparationTime={10}
                          recordingTime={30}
                          maxRetries={3}
                        />
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between">
                        <button
                          onClick={handlePrevExercise}
                          disabled={currentExercise === 0}
                          className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                        >
                          Previous
                        </button>
                        <button
                          onClick={handleNextExercise}
                          disabled={currentExercise === exercises.length - 1}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Conversation Scenarios Tab */}
              {activeTab === 'conversation' && (
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conversationScenarios.map((scenario) => (
                      <div key={scenario.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{scenario.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            scenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            scenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {scenario.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{scenario.english}</p>
                        <div className="space-y-2">
                          {scenario.dialogues.slice(0, 2).map((dialogue, index) => (
                            <div key={index} className="text-sm">
                              <p className="text-gray-800">{dialogue.marathi}</p>
                              <p className="text-gray-600">{dialogue.english}</p>
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Practice Scenario
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="p-6">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-semibold mb-6">Your Progress</h3>
                    
                    {/* Category Progress */}
                    <div className="space-y-4 mb-8">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Basic Phrases</span>
                          <span>{progress.basic?.length || 0}/{marathiToEnglishExercises.basicPhrases.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 rounded-full h-3"
                            style={{ width: `${((progress.basic?.length || 0) / marathiToEnglishExercises.basicPhrases.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Daily Conversation</span>
                          <span>{progress.daily?.length || 0}/{marathiToEnglishExercises.dailyConversation.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 rounded-full h-3"
                            style={{ width: `${((progress.daily?.length || 0) / marathiToEnglishExercises.dailyConversation.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Advanced Phrases</span>
                          <span>{progress.advanced?.length || 0}/{marathiToEnglishExercises.advancedPhrases.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-500 rounded-full h-3"
                            style={{ width: `${((progress.advanced?.length || 0) / marathiToEnglishExercises.advancedPhrases.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badges */}
                    <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                      <h4 className="font-semibold mb-4">Achievements</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Star className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm font-medium">First Steps</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm font-medium">Quick Learner</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CheckCircle className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-sm font-medium">Dedicated</p>
                        </div>
                      </div>
                    </div>

                    {/* Reset Progress */}
                    <div className="text-center">
                      <button
                        onClick={resetProgress}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reset All Progress
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
