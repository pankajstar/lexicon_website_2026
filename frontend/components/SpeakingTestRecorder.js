import { useState, useRef, useEffect } from 'react'
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  Upload,
  Clock,
  AlertCircle,
  CheckCircle,
  Volume2
} from 'lucide-react'

const SpeakingTestRecorder = ({ 
  question, 
  questionNumber, 
  onRecordingComplete, 
  preparationTime = 60,
  recordingTime = 120,
  maxRetries = 3 
}) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const [recordingBlob, setRecordingBlob] = useState(null)
  const [preparationCountdown, setPreparationCountdown] = useState(preparationTime)
  const [recordingCountdown, setRecordingCountdown] = useState(recordingTime)
  const [currentPhase, setCurrentPhase] = useState('idle') // idle, preparation, recording, review
  const [attempts, setAttempts] = useState(0)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [error, setError] = useState('')
  
  const mediaRecorderRef = useRef(null)
  const audioRef = useRef(null)
  const streamRef = useRef(null)
  const analyserRef = useRef(null)
  const animationFrameRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    checkMicrophonePermission()
    return () => {
      cleanup()
    }
  }, [])

  useEffect(() => {
    if (currentPhase === 'preparation' && preparationCountdown > 0) {
      timerRef.current = setTimeout(() => {
        setPreparationCountdown(prev => prev - 1)
      }, 1000)
    } else if (currentPhase === 'preparation' && preparationCountdown === 0) {
      startRecording()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentPhase, preparationCountdown])

  useEffect(() => {
    if (currentPhase === 'recording' && recordingCountdown > 0 && !isPaused) {
      timerRef.current = setTimeout(() => {
        setRecordingCountdown(prev => prev - 1)
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } else if (currentPhase === 'recording' && recordingCountdown === 0) {
      stopRecording()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentPhase, recordingCountdown, isPaused])

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setPermissionGranted(true)
      stream.getTracks().forEach(track => track.stop())
    } catch (err) {
      setPermissionGranted(false)
      setError('Microphone permission is required for the speaking test')
    }
  }

  const setupAudioAnalyser = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const microphone = audioContext.createMediaStreamSource(stream)
    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    analyser.fftSize = 256
    microphone.connect(analyser)
    analyserRef.current = { analyser, dataArray }

    const updateAudioLevel = () => {
      if (analyserRef.current && isRecording && !isPaused) {
        analyserRef.current.analyser.getByteFrequencyData(analyserRef.current.dataArray)
        const average = analyserRef.current.dataArray.reduce((a, b) => a + b) / analyserRef.current.dataArray.length
        setAudioLevel(average / 255)
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
      }
    }

    updateAudioLevel()
  }

  const startPreparation = () => {
    if (!permissionGranted) {
      setError('Please allow microphone access to continue')
      return
    }
    setCurrentPhase('preparation')
    setPreparationCountdown(preparationTime)
    setError('')
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      })

      streamRef.current = stream
      setupAudioAnalyser(stream)

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })

      const chunks = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' })
        setRecordingBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        setCurrentPhase('review')
        setAttempts(prev => prev + 1)
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
      setCurrentPhase('recording')
      setRecordingCountdown(recordingTime)
      setRecordingDuration(0)
      setError('')
    } catch (err) {
      setError('Failed to start recording. Please check your microphone.')
      console.error('Recording error:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      setAudioLevel(0)
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume()
        setIsPaused(false)
      } else {
        mediaRecorderRef.current.pause()
        setIsPaused(true)
      }
    }
  }

  const playRecording = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const resetRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL)
    }
    setAudioURL('')
    setRecordingBlob(null)
    setCurrentPhase('idle')
    setPreparationCountdown(preparationTime)
    setRecordingCountdown(recordingTime)
    setRecordingDuration(0)
    setIsRecording(false)
    setIsPaused(false)
    setIsPlaying(false)
    setError('')
  }

  const retryRecording = () => {
    if (attempts < maxRetries) {
      resetRecording()
      startPreparation()
    }
  }

  const submitRecording = () => {
    if (recordingBlob && onRecordingComplete) {
      onRecordingComplete({
        blob: recordingBlob,
        duration: recordingDuration,
        questionNumber,
        attempts: attempts + 1
      })
    }
  }

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    if (audioURL) {
      URL.revokeObjectURL(audioURL)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Question Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Question {questionNumber}</h3>
          {attempts > 0 && (
            <span className="text-sm text-gray-600">
              Attempt {attempts} of {maxRetries}
            </span>
          )}
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed">{question}</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Preparation Phase */}
      {currentPhase === 'preparation' && (
        <div className="text-center py-8">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Preparation Time</h4>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatTime(preparationCountdown)}
            </div>
            <p className="text-gray-600">Prepare your answer</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 rounded-full h-3 transition-all duration-1000"
              style={{ width: `${((preparationTime - preparationCountdown) / preparationTime) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Recording Phase */}
      {currentPhase === 'recording' && (
        <div className="space-y-6">
          {/* Timer and Controls */}
          <div className="text-center">
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Recording Time</h4>
              <div className="text-4xl font-bold text-red-600 mb-2">
                {formatTime(recordingCountdown)}
              </div>
              <p className="text-gray-600">
                {isPaused ? 'Recording paused' : 'Speak clearly into your microphone'}
              </p>
            </div>
            
            {/* Audio Level Indicator */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-red-500 rounded-full h-4 transition-all duration-100"
                  style={{ width: `${audioLevel * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">Audio Level</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-600 rounded-full h-3 transition-all duration-1000"
                style={{ width: `${((recordingTime - recordingCountdown) / recordingTime) * 100}%` }}
              />
            </div>
          </div>

          {/* Recording Controls */}
          <div className="flex justify-center space-x-4">
            {isPaused ? (
              <button
                onClick={pauseRecording}
                className="p-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
              >
                <Play className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={pauseRecording}
                className="p-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
              >
                <Pause className="w-6 h-6" />
              </button>
            )}
            
            <button
              onClick={stopRecording}
              className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <Square className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Idle Phase */}
      {currentPhase === 'idle' && (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-12 h-12 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Ready to Start</h4>
            <p className="text-gray-600 mb-4">
              You will have {preparationTime} seconds to prepare and {recordingTime} seconds to speak
            </p>
          </div>
          
          <button
            onClick={startPreparation}
            disabled={!permissionGranted}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Test
          </button>
        </div>
      )}

      {/* Review Phase */}
      {currentPhase === 'review' && audioURL && (
        <div className="space-y-6">
          {/* Recording Playback */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Your Recording</h4>
            <audio ref={audioRef} src={audioURL} className="w-full" controls />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>Duration: {formatTime(recordingDuration)}</span>
              <span>Size: {(recordingBlob.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {attempts < maxRetries && (
              <button
                onClick={retryRecording}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry ({maxRetries - attempts} left)</span>
              </button>
            )}
            
            <button
              onClick={submitRecording}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Answer</span>
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Instructions:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Make sure your microphone is working properly</li>
          <li>• Speak clearly and at a normal pace</li>
          <li>• Use the preparation time to organize your thoughts</li>
          <li>• You can retry the recording if you're not satisfied</li>
          <li>• Maximum {maxRetries} attempts allowed</li>
        </ul>
      </div>
    </div>
  )
}

export default SpeakingTestRecorder
