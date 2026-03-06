import { useState, useEffect } from 'react'
import { 
  Volume2, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Star,
  Clock,
  Trophy,
  Target
} from 'lucide-react'

const marathiVocabulary = {
  greetings: [
    { marathi: 'नमस्कार', english: 'Hello', pronunciation: 'Namaskar', difficulty: 'easy' },
    { marathi: 'सुप्रभात', english: 'Good morning', pronunciation: 'Suprabhat', difficulty: 'easy' },
    { marathi: 'सुद्धा दिवस', english: 'Good afternoon', pronunciation: 'Shuddha divas', difficulty: 'easy' },
    { marathi: 'सुद्धा संध्याकाळ', english: 'Good evening', pronunciation: 'Shuddha sandhyakal', difficulty: 'easy' },
    { marathi: 'शुभरात्री', english: 'Good night', pronunciation: 'Shubhratri', difficulty: 'easy' }
  ],
  family: [
    { marathi: 'आई', english: 'Mother', pronunciation: 'Aai', difficulty: 'easy' },
    { marathi: 'वडील', english: 'Father', pronunciation: 'Vadil', difficulty: 'easy' },
    { marathi: 'भाऊ', english: 'Brother', pronunciation: 'Bhau', difficulty: 'easy' },
    { marathi: 'बहीण', english: 'Sister', pronunciation: 'Bahin', difficulty: 'easy' },
    { marathi: 'आजी', english: 'Grandmother', pronunciation: 'Aaji', difficulty: 'medium' },
    { marathi: 'आजोबा', english: 'Grandfather', pronunciation: 'Ajoba', difficulty: 'medium' }
  ],
  food: [
    { marathi: 'भात', english: 'Rice', pronunciation: 'Bhaat', difficulty: 'easy' },
    { marathi: 'पाणी', english: 'Water', pronunciation: 'Paani', difficulty: 'easy' },
    { marathi: 'चहा', english: 'Tea', pronunciation: 'Chaha', difficulty: 'easy' },
    { marathi: 'कॉफी', english: 'Coffee', pronunciation: 'Coffee', difficulty: 'easy' },
    { marathi: 'फळं', english: 'Fruits', pronunciation: 'Phala', difficulty: 'medium' },
    { marathi: 'भाजी', english: 'Vegetables', pronunciation: 'Bhaji', difficulty: 'medium' }
  ],
  dailyLife: [
    { marathi: 'घर', english: 'Home', pronunciation: 'Ghar', difficulty: 'easy' },
    { marathi: 'ऑफिस', english: 'Office', pronunciation: 'Office', difficulty: 'easy' },
    { marathi: 'शाळा', english: 'School', pronunciation: 'Shala', difficulty: 'easy' },
    { marathi: 'बाजार', english: 'Market', pronunciation: 'Bazaar', difficulty: 'medium' },
    { marathi: 'रुग्णालय', english: 'Hospital', pronunciation: 'Rugnalaya', difficulty: 'medium' },
    { marathi: 'स्टेशन', english: 'Station', pronunciation: 'Station', difficulty: 'medium' }
  ],
  verbs: [
    { marathi: 'जाणे', english: 'To go', pronunciation: 'Jaane', difficulty: 'medium' },
    { marathi: 'येणे', english: 'To come', pronunciation: 'Yene', difficulty: 'medium' },
    { marathi: 'बोलणे', english: 'To speak', pronunciation: 'Bolne', difficulty: 'medium' },
    { marathi: 'खाणे', english: 'To eat', pronunciation: 'Khane', difficulty: 'medium' },
    { marathi: 'पीणे', english: 'To drink', pronunciation: 'Pine', difficulty: 'medium' },
    { marathi: 'शिकणे', english: 'To learn', pronunciation: 'Shikne', difficulty: 'hard' }
  ],
  adjectives: [
    { marathi: 'चांगला', english: 'Good', pronunciation: 'Changla', difficulty: 'easy' },
    { marathi: 'वाईट', english: 'Bad', pronunciation: 'Vait', difficulty: 'easy' },
    { marathi: 'मोठा', english: 'Big', pronunciation: 'Motha', difficulty: 'easy' },
    { marathi: 'लहान', english: 'Small', pronunciation: 'Lahan', difficulty: 'easy' },
    { marathi: 'सुंदर', english: 'Beautiful', pronunciation: 'Sundar', difficulty: 'medium' },
    { marathi: 'कष्ट', english: 'Difficult', pronunciation: 'Kasht', difficulty: 'hard' }
  ]
}

const MarathiVocabularyBuilder = () => {
  const [selectedCategory, setSelectedCategory] = useState('greetings')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showEnglish, setShowEnglish] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [completedWords, setCompletedWords] = useState(new Set())
  const [studyMode, setStudyMode] = useState('flashcard') // flashcard, quiz, pronunciation
  const [startTime, setStartTime] = useState(Date.now())
  const [sessionStats, setSessionStats] = useState({
    wordsStudied: 0,
    correctAnswers: 0,
    totalTime: 0
  })

  const currentWords = marathiVocabulary[selectedCategory] || []
  const currentWord = currentWords[currentWordIndex]

  useEffect(() => {
    setCurrentWordIndex(0)
    setShowEnglish(false)
    setUserAnswer('')
    setIsCorrect(null)
  }, [selectedCategory])

  const playAudio = (text, lang = 'en') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === 'mr' ? 'mr-IN' : 'en-US'
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const handleNextWord = () => {
    if (currentWordIndex < currentWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1)
      setShowEnglish(false)
      setUserAnswer('')
      setIsCorrect(null)
    }
  }

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1)
      setShowEnglish(false)
      setUserAnswer('')
      setIsCorrect(null)
    }
  }

  const handleQuizSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === currentWord.english.toLowerCase()
    setIsCorrect(correct)
    setAttempts(prev => prev + 1)
    
    if (correct) {
      setScore(prev => prev + 1)
      setCompletedWords(prev => new Set([...prev, currentWord.english]))
      setSessionStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1
      }))
    }
    
    setSessionStats(prev => ({
      ...prev,
      wordsStudied: prev.wordsStudied + 1
    }))
  }

  const resetQuiz = () => {
    setUserAnswer('')
    setIsCorrect(null)
  }

  const getCategoryProgress = () => {
    const categoryCompleted = Array.from(completedWords).filter(word =>
      currentWords.some(w => w.english === word)
    ).length
    return Math.round((categoryCompleted / currentWords.length) * 100)
  }

  const shuffleWords = () => {
    const shuffled = [...currentWords].sort(() => Math.random() - 0.5)
    return shuffled
  }

  const startNewSession = () => {
    setScore(0)
    setAttempts(0)
    setCompletedWords(new Set())
    setStartTime(Date.now())
    setSessionStats({
      wordsStudied: 0,
      correctAnswers: 0,
      totalTime: 0
    })
  }

  if (!currentWord) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Marathi Vocabulary Builder</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Score: {score}/{attempts}
          </div>
          <button
            onClick={startNewSession}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Session
          </button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(marathiVocabulary).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Study Mode Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setStudyMode('flashcard')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            studyMode === 'flashcard'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <BookOpen className="w-4 h-4 inline mr-2" />
          Flashcards
        </button>
        <button
          onClick={() => setStudyMode('quiz')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            studyMode === 'quiz'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Quiz Mode
        </button>
        <button
          onClick={() => setStudyMode('pronunciation')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            studyMode === 'pronunciation'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Volume2 className="w-4 h-4 inline mr-2" />
          Pronunciation
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress: {currentWordIndex + 1} of {currentWords.length}</span>
          <span>{getCategoryProgress()}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 rounded-full h-3 transition-all duration-300"
            style={{ width: `${getCategoryProgress()}%` }}
          />
        </div>
      </div>

      {/* Flashcard Mode */}
      {studyMode === 'flashcard' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <div className="text-center">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentWord.difficulty}
                </span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                {currentWord.marathi}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Pronunciation: {currentWord.pronunciation}
              </p>
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => playAudio(currentWord.marathi, 'mr')}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear Marathi</span>
                </button>
                <button
                  onClick={() => playAudio(currentWord.english, 'en')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear English</span>
                </button>
              </div>
              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showEnglish ? 'Hide' : 'Show'} English
              </button>
              {showEnglish && (
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <h4 className="text-2xl font-bold text-gray-900">
                    {currentWord.english}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Mode */}
      {studyMode === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                {currentWord.marathi}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                What is the English translation?
              </p>
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer in English..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleQuizSubmit()}
                />
              </div>
              
              {isCorrect !== null && (
                <div className={`mt-4 p-4 rounded-lg flex items-center justify-center space-x-2 ${
                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Correct! Well done!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Not quite. The answer is: {currentWord.english}</span>
                    </>
                  )}
                </div>
              )}
              
              <div className="flex justify-center space-x-4 mt-6">
                {!isCorrect ? (
                  <button
                    onClick={handleQuizSubmit}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextWord}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Next Word
                  </button>
                )}
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pronunciation Mode */}
      {studyMode === 'pronunciation' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                {currentWord.marathi}
              </h3>
              <p className="text-lg text-gray-600 mb-2">
                Pronunciation: {currentWord.pronunciation}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                English: {currentWord.english}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => playAudio(currentWord.marathi, 'mr')}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Hear Marathi</span>
                </button>
                <button
                  onClick={() => playAudio(currentWord.english, 'en')}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Hear English</span>
                </button>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  Practice saying the word aloud. Listen to the pronunciation and repeat several times.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevWord}
          disabled={currentWordIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        <div className="text-sm text-gray-600">
          Word {currentWordIndex + 1} of {currentWords.length}
        </div>
        <button
          onClick={handleNextWord}
          disabled={currentWordIndex === currentWords.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Session Stats */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Session Statistics</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Words Studied:</span>
            <span className="font-medium ml-2">{sessionStats.wordsStudied}</span>
          </div>
          <div>
            <span className="text-gray-600">Accuracy:</span>
            <span className="font-medium ml-2">
              {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
            </span>
          </div>
          <div>
            <span className="text-gray-600">Time:</span>
            <span className="font-medium ml-2">
              {Math.floor((Date.now() - startTime) / 60000)} min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarathiVocabularyBuilder
