import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Volume2, Headphones } from 'lucide-react'

const ListeningTestPlayer = ({ test, onAnswerSubmit, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showTranscript, setShowTranscript] = useState(false)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      if (currentQuestion === test.questions.length - 1) {
        onComplete(answers)
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentQuestion, test.questions.length, answers, onComplete])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const resetAudio = () => {
    const audio = audioRef.current
    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const currentQ = test.questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Audio Player */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Headphones className="w-8 h-8" />
              <h3 className="text-xl font-semibold">IELTS Listening Test</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  setVolume(e.target.value)
                  audioRef.current.volume = e.target.value
                }}
                className="w-24"
              />
            </div>
          </div>

          <audio
            ref={audioRef}
            src={test.audioUrl}
            preload="metadata"
          />

          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={resetAudio}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlayPause}
                className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Question {currentQuestion + 1} of {test.questions.length}</h4>
          <div className="flex space-x-2">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === test.questions.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex space-x-2">
          {test.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[index] !== undefined
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {currentQ.type.charAt(0).toUpperCase() + currentQ.type.slice(1)}
            </span>
            <h5 className="text-lg font-semibold mb-2">Question {currentQuestion + 1}</h5>
            <p className="text-gray-700 mb-4">{currentQ.question}</p>
          </div>

          {/* Question Input Based on Type */}
          {currentQ.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
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
              value={answers[currentQuestion] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}

          {currentQ.type === 'true-false' && (
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value="true"
                  checked={answers[currentQuestion] === 'true'}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>True</span>
              </label>
              <label className="flex items-center space-x-2 p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value="false"
                  checked={answers[currentQuestion] === 'false'}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>False</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Transcript Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </button>
      </div>

      {/* Transcript */}
      {showTranscript && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h5 className="text-lg font-semibold mb-3">Audio Transcript</h5>
          <p className="text-gray-700 leading-relaxed">{test.transcript}</p>
        </div>
      )}

      {/* Submit Button */}
      {currentQuestion === test.questions.length - 1 && (
        <div className="text-center">
          <button
            onClick={() => onComplete(answers)}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Test
          </button>
        </div>
      )}
    </div>
  )
}

export default ListeningTestPlayer
