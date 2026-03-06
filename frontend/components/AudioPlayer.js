import { useState, useRef, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  RotateCcw,
  Settings,
  Headphones,
  Clock
} from 'lucide-react'

const AudioPlayer = ({ 
  audioUrl, 
  onTimeUpdate, 
  onEnded, 
  onProgress,
  showTranscript = false,
  transcript = '',
  autoPlay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [showTranscriptPanel, setShowTranscriptPanel] = useState(showTranscript)
  const [currentTimeInTranscript, setCurrentTimeInTranscript] = useState(0)
  
  const audioRef = useRef(null)
  const progressBarRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      const time = audio.currentTime
      setCurrentTime(time)
      setCurrentTimeInTranscript(time)
      if (onTimeUpdate) onTimeUpdate(time)
      if (onProgress) onProgress(time, audio.duration)
    }

    const updateDuration = () => {
      const dur = audio.duration
      setDuration(dur || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onEnded) onEnded()
    }

    const handleLoadedMetadata = () => {
      updateDuration()
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('durationchange', updateDuration)

    // Set initial volume
    audio.volume = volume

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('durationchange', updateDuration)
    }
  }, [volume, onTimeUpdate, onEnded, onProgress])

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [autoPlay])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    const progressBar = progressBarRef.current
    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * audio.duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const skipForward = () => {
    const audio = audioRef.current
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    audio.currentTime = Math.max(audio.currentTime - 10, 0)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    audioRef.current.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handlePlaybackRateChange = (rate) => {
    const audio = audioRef.current
    audio.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const resetAudio = () => {
    const audio = audioRef.current
    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    if (!duration || isNaN(duration)) return 0
    return (currentTime / duration) * 100
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Main Audio Player */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Headphones className="w-8 h-8 text-white" />
            <h3 className="text-xl font-semibold text-white">Audio Player</h3>
          </div>
          <div className="flex items-center space-x-3">
            {/* Transcript Toggle */}
            {transcript && (
              <button
                onClick={() => setShowTranscriptPanel(!showTranscriptPanel)}
                className={`p-2 rounded-lg transition-colors ${
                  showTranscriptPanel 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Clock className="w-5 h-5" />
              </button>
            )}
            
            {/* Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-10">
                  <h4 className="font-semibold text-gray-900 mb-3">Playback Speed</h4>
                  <div className="space-y-2">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${
                          playbackRate === rate
                            ? 'bg-blue-100 text-blue-600'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            ref={progressBarRef}
            className="bg-white/20 rounded-full h-3 cursor-pointer relative"
            onClick={handleSeek}
          >
            <div
              className="bg-white rounded-full h-3 transition-all duration-300 relative"
              style={{ width: `${getProgressPercentage()}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-white text-sm">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={skipBackward}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={resetAudio}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-4 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button
            onClick={skipForward}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-3 mt-4">
          <button
            onClick={toggleMute}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-white text-sm w-10">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Playback Speed Indicator */}
        <div className="text-center mt-2">
          <span className="text-white/80 text-sm">
            Speed: {playbackRate}x
          </span>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />

      {/* Transcript Panel */}
      {showTranscriptPanel && transcript && (
        <div className="border-t border-gray-200">
          <div className="p-6 bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h4>
            <div className="prose max-w-none">
              <div className="bg-white rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {transcript}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>Current position: {formatTime(currentTimeInTranscript)}</span>
              <button
                onClick={() => {
                  const words = transcript.split(' ')
                  const wordsPerSecond = 2.5 // Average speaking rate
                  const targetWordIndex = Math.floor(currentTimeInTranscript * wordsPerSecond)
                  // This would need more sophisticated implementation for actual highlighting
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Sync with audio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AudioPlayer
