import { useState, useEffect } from 'react'
import { 
  Users, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2,
  Mic,
  CheckCircle,
  Clock,
  MessageSquare,
  Globe,
  Star
} from 'lucide-react'

const marathiConversations = {
  basic: [
    {
      id: 1,
      title: 'Meeting Someone New',
      context: 'Two people meeting for the first time',
      difficulty: 'easy',
      dialogue: [
        {
          speaker: 'Person A',
          marathi: 'नमस्कार! माझे नाव राम आहे.',
          english: 'Hello! My name is Ram.',
          pronunciation: 'Namaskar! Maje naav Ram aahe.'
        },
        {
          speaker: 'Person B',
          marathi: 'नमस्कार राम! माझे नाव सीता आहे.',
          english: 'Hello Ram! My name is Sita.',
          pronunciation: 'Namaskar Ram! Maje naav Sita aahe.'
        },
        {
          speaker: 'Person A',
          marathi: 'तुम्ही कुठून आहात सीता?',
          english: 'Where are you from Sita?',
          pronunciation: 'Tumhi kutun aahat Sita?'
        },
        {
          speaker: 'Person B',
          marathi: 'मी पुण्याहून आहे. आणि तुम्ही?',
          english: 'I am from Pune. And you?',
          pronunciation: 'Me Puneun aahe. Aani tumhi?'
        },
        {
          speaker: 'Person A',
          marathi: 'मी मुंबईहून आहे.',
          english: 'I am from Mumbai.',
          pronunciation: 'Me Mumbaiun aahe.'
        }
      ]
    },
    {
      id: 2,
      title: 'At a Tea Shop',
      context: 'Ordering tea at a local tea shop',
      difficulty: 'easy',
      dialogue: [
        {
          speaker: 'Customer',
          marathi: 'एक चहा द्या.',
          english: 'Give me one tea.',
          pronunciation: 'Ek chaha dya.'
        },
        {
          speaker: 'Shopkeeper',
          marathi: 'चांगला चहा आहे का गोडी?',
          english: 'Do you want good tea or sweet tea?',
          pronunciation: 'Changla chaha aahe ka godi?'
        },
        {
          speaker: 'Customer',
          marathi: 'चांगला चहा द्या.',
          english: 'Give me good tea.',
          pronunciation: 'Changla chaha dya.'
        },
        {
          speaker: 'Shopkeeper',
          marathi: 'ठीक आहे. किती चहा?',
          english: 'Okay. How many teas?',
          pronunciation: 'Theek aahe. Kiti chaha?'
        },
        {
          speaker: 'Customer',
          marathi: 'फक्त एक.',
          english: 'Only one.',
          pronunciation: 'Fakt ek.'
        }
      ]
    }
  ],
  intermediate: [
    {
      id: 3,
      title: 'Job Interview',
      context: 'A job interview for a software developer position',
      difficulty: 'medium',
      dialogue: [
        {
          speaker: 'Interviewer',
          marathi: 'आपले स्वतःबद्दल सांगा.',
          english: 'Tell me about yourself.',
          pronunciation: 'Aaple swatabaddal sanga.'
        },
        {
          speaker: 'Candidate',
          marathi: 'मी सॉफ्टवेअर डेव्हलपर आहे. मला 3 वर्षांचा अनुभव आहे.',
          english: 'I am a software developer. I have 3 years of experience.',
          pronunciation: 'Me software developer aahe. Mala 3 varshancha anubhav aahe.'
        },
        {
          speaker: 'Interviewer',
          marathi: 'आपण कोणत्या टेक्नॉलॉजीवर काम केले आहे?',
          english: 'What technologies have you worked on?',
          pronunciation: 'Aapan konatya technologywar kam kele aahe?'
        },
        {
          speaker: 'Candidate',
          marathi: 'मी जावा, पायथन, आणि रिएक्ट वर काम केले आहे.',
          english: 'I have worked on Java, Python, and React.',
          pronunciation: 'Me Java, Python, aani React war kam kele aahe.'
        },
        {
          speaker: 'Interviewer',
          marathi: 'आपली पगार अपेक्षा किती आहे?',
          english: 'What is your expected salary?',
          pronunciation: 'Aapli pagar apeksha kiti aahe?'
        },
        {
          speaker: 'Candidate',
          marathi: 'मला वर्षाला ८ लाख रुपये हवे आहेत.',
          english: 'I expect 8 lakh rupees per year.',
          pronunciation: 'Mala varshala 8 lakh rupee have aahet.'
        }
      ]
    },
    {
      id: 4,
      title: 'Doctor Appointment',
      context: 'Patient visiting a doctor for checkup',
      difficulty: 'medium',
      dialogue: [
        {
          speaker: 'Patient',
          marathi: 'डॉक्टर साहेब, मला ताप आला आहे.',
          english: 'Doctor, I have fever.',
          pronunciation: 'Doctor saheb, mala tap aala aahe.'
        },
        {
          speaker: 'Doctor',
          marathi: 'किती दिवापासून ताप आहे?',
          english: 'Since how many days do you have fever?',
          pronunciation: 'Kiti divapasun tap aahe?'
        },
        {
          speaker: 'Patient',
          marathi: 'गेल्या दोन दिवसांपासून ताप आहे.',
          english: 'I have fever since last two days.',
          pronunciation: 'Gelya don divasapasun tap aahe.'
        },
        {
          speaker: 'Doctor',
          marathi: 'तुम्ही औषधे घेता?',
          english: 'Did you take any medicine?',
          pronunciation: 'Tumhi aushadhe gheta?'
        },
        {
          speaker: 'Patient',
          marathi: 'नाही, आतापर्यंत औषधे घेतले नाही.',
          english: 'No, I haven't taken any medicine yet.',
          pronunciation: 'Nahi, ataparyant aushadhe ghetele nahi.'
        },
        {
          speaker: 'Doctor',
          marathi: 'मी तुम्हाला औषधे लिहून देतो. दररोज घ्या.',
          english: 'I will prescribe you medicine. Take it daily.',
          pronunciation: 'Me tumhala aushadhe lihun deto. Darroj ghya.'
        }
      ]
    }
  ],
  advanced: [
    {
      id: 5,
      title: 'Business Meeting',
      context: 'Discussing a new project in a business meeting',
      difficulty: 'hard',
      dialogue: [
        {
          speaker: 'Manager',
          marathi: 'आपल्याला एक नवीन प्रकल्पावर काम करावे लागेल.',
          english: 'We need to work on a new project.',
          pronunciation: 'Aaplyala ek navin prakalpar kam karave lagel.'
        },
        {
          speaker: 'Team Lead',
          marathi: 'प्रकल्पाची माहिती आपल्याला द्यावी लागेल.',
          english: 'We need information about the project.',
          pronunciation: 'Prakalpachi mahiti aaplyala dyavi lagel.'
        },
        {
          speaker: 'Manager',
          marathi: 'हा वेबसाइट डेव्हलपमेंटचा प्रकल्प आहे.',
          english: 'This is a website development project.',
          pronunciation: 'Ha website developmentcha prakalp aahe.'
        },
        {
          speaker: 'Developer',
          marathi: 'आपण कोणत्या टेक्नॉलॉजी वापरू?',
          english: 'Which technology should we use?',
          pronunciation: 'Aapan konatya technology vapar?'
        },
        {
          speaker: 'Manager',
          marathi: 'क्लायंट नुसार आपण मर्यादित वेळेत पूर्ण करावे.',
          english: 'We need to complete it on time as per client requirements.',
          pronunciation: 'Client nyusar aapla maryadit velelet purn karave.'
        },
        {
          speaker: 'Team Lead',
          marathi: 'आपण योग्य नियोजन केल्यास वेळेत पूर्ण होईल.',
          english: 'If we plan properly, we will complete it on time.',
          pronunciation: 'Aapan yogya niyonkelas velet purn hoil.'
        }
      ]
    },
    {
      id: 6,
      title: 'Academic Discussion',
      context: 'Students discussing their research project',
      difficulty: 'hard',
      dialogue: [
        {
          speaker: 'Student 1',
          marathi: 'आपल्या संशोधन प्रकल्पावर काम सुरू करूया.',
          english: 'Let\'s start working on our research project.',
          pronunciation: 'Aaplya sanshodhan prakalpar kam suru karuya.'
        },
        {
          speaker: 'Student 2',
          marathi: 'आपल्याला विषय निवडावा लागेल.',
          english: 'We need to choose a topic.',
          pronunciation: 'Aaplyala vishay nidlava lagel.'
        },
        {
          speaker: 'Student 1',
          marathi: 'पर्यावरण संरक्षणावर संशोध कसा?',
          english: 'How about research on environmental protection?',
          pronunciation: 'Parayavaran sansrakshanwar sanshodhan kasa?'
        },
        {
          speaker: 'Student 3',
          marathi: 'हा चांगला विषय आहे. सध्याच्या काळात खूप महत्त्वाचा आहे.',
          english: 'This is a good topic. It\'s very important in current times.',
          pronunciation: 'Ha changla vishay aahe. Sadhyachya kalat khoot mahatvacha aahe.'
        },
        {
          speaker: 'Student 2',
          marathi: 'आपण प्रोफेसरांशी चर्चा करूया.',
          english: 'Let\'s discuss with our professor.',
          pronunciation: 'Aapan professorashi charcha karuya.'
        },
        {
          speaker: 'Student 1',
          marathi: 'प्रोफेसरांना आपला योजना सांगायला आवडेल.',
          english: 'The professor will like our plan.',
          pronunciation: 'Professoranna aapla yojana sangaayala avadel.'
        }
      ]
    }
  ]
}

const MarathiConversationPractice = () => {
  const [selectedLevel, setSelectedLevel] = useState('basic')
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [practiceMode, setPracticeMode] = useState('listen') // listen, practice, record
  const [userRecording, setUserRecording] = useState(null)
  const [showTranslation, setShowTranslation] = useState(false)
  const [completedConversations, setCompletedConversations] = useState(new Set())
  const [practiceStats, setPracticeStats] = useState({
    totalPractices: 0,
    completedPractices: 0,
    averageScore: 0
  })

  const conversations = marathiConversations[selectedLevel] || []
  const currentConversation = selectedConversation || conversations[0]

  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0])
    }
  }, [selectedLevel, conversations, selectedConversation])

  const playAudio = (text, lang = 'en') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === 'mr' ? 'mr-IN' : 'en-US'
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const playConversation = () => {
    if (!currentConversation) return
    
    setIsPlaying(true)
    let index = 0
    
    const playNextLine = () => {
      if (index < currentConversation.dialogue.length) {
        const line = currentConversation.dialogue[index]
        playAudio(line.marathi, 'mr')
        
        setTimeout(() => {
          index++
          if (index < currentConversation.dialogue.length) {
            playNextLine()
          } else {
            setIsPlaying(false)
          }
        }, 3000) // 3 seconds per line
      }
    }
    
    playNextLine()
  }

  const handleRecordingComplete = (recording) => {
    setUserRecording(recording)
    setPracticeStats(prev => ({
      ...prev,
      completedPractices: prev.completedPractices + 1
    }))
  }

  const handleNextLine = () => {
    if (currentLineIndex < currentConversation.dialogue.length - 1) {
      setCurrentLineIndex(prev => prev + 1)
    }
  }

  const handlePrevLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(prev => prev - 1)
    }
  }

  const handleConversationComplete = () => {
    setCompletedConversations(prev => new Set([...prev, currentConversation.id]))
    setPracticeStats(prev => ({
      ...prev,
      totalPractices: prev.totalPractices + 1
    }))
  }

  const resetPractice = () => {
    setCurrentLineIndex(0)
    setUserRecording(null)
    setShowTranslation(false)
  }

  if (!currentConversation) {
    return <div>Loading...</div>
  }

  const currentLine = currentConversation.dialogue[currentLineIndex]
  const progress = ((currentLineIndex + 1) / currentConversation.dialogue.length) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Marathi Conversation Practice</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Completed: {completedConversations.size}/{conversations.length}
          </div>
        </div>
      </div>

      {/* Level Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedLevel('basic')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedLevel === 'basic'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setSelectedLevel('intermediate')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedLevel === 'intermediate'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Intermediate
        </button>
        <button
          onClick={() => setSelectedLevel('advanced')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedLevel === 'advanced'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Advanced
        </button>
      </div>

      {/* Conversation Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => {
              setSelectedConversation(conv)
              resetPractice()
            }}
            className={`p-4 rounded-lg border-2 text-left transition-colors ${
              selectedConversation?.id === conv.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h3 className="font-semibold mb-1">{conv.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{conv.context}</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              conv.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              conv.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {conv.difficulty}
            </span>
          </button>
        ))}
      </div>

      {/* Practice Mode Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setPracticeMode('listen')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            practiceMode === 'listen'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Volume2 className="w-4 h-4 inline mr-2" />
          Listen
        </button>
        <button
          onClick={() => setPracticeMode('practice')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            practiceMode === 'practice'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Practice
        </button>
        <button
          onClick={() => setPracticeMode('record')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            practiceMode === 'record'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Mic className="w-4 h-4 inline mr-2" />
          Record
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Line {currentLineIndex + 1} of {currentConversation.dialogue.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 rounded-full h-3 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Line Display */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentLine.speaker}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => playAudio(currentLine.marathi, 'mr')}
              className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => playAudio(currentLine.english, 'en')}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {currentLine.marathi}
          </h3>
          <p className="text-gray-600 mb-4">
            {currentLine.pronunciation}
          </p>
          
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showTranslation ? 'Hide' : 'Show'} Translation
          </button>
          
          {showTranslation && (
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-lg font-medium text-gray-900">
                {currentLine.english}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Listen Mode */}
      {practiceMode === 'listen' && (
        <div className="text-center mb-6">
          <button
            onClick={playConversation}
            disabled={isPlaying}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Play className="w-5 h-5 inline mr-2" />
            {isPlaying ? 'Playing...' : 'Play Full Conversation'}
          </button>
        </div>
      )}

      {/* Practice Mode */}
      {practiceMode === 'practice' && (
        <div className="space-y-4 mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Practice saying this line aloud. Repeat after hearing the audio.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => playAudio(currentLine.marathi, 'mr')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Volume2 className="w-4 h-4 inline mr-2" />
                Hear Marathi
              </button>
              <button
                onClick={() => playAudio(currentLine.english, 'en')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Volume2 className="w-4 h-4 inline mr-2" />
                Hear English
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Mode */}
      {practiceMode === 'record' && (
        <div className="mb-6">
          <div className="text-center mb-4">
            <p className="text-gray-600">
              Record yourself saying this line in English.
            </p>
          </div>
          {/* Here you would integrate the SpeakingTestRecorder component */}
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <Mic className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <p className="text-purple-800">Recording feature would be integrated here</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevLine}
          disabled={currentLineIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Previous Line
        </button>
        
        <div className="text-sm text-gray-600">
          {currentLineIndex + 1} / {currentConversation.dialogue.length}
        </div>
        
        {currentLineIndex === currentConversation.dialogue.length - 1 ? (
          <button
            onClick={handleConversationComplete}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            Complete
          </button>
        ) : (
          <button
            onClick={handleNextLine}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Line
          </button>
        )}
      </div>

      {/* Practice Stats */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Practice Statistics</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Practices:</span>
            <span className="font-medium ml-2">{practiceStats.totalPractices}</span>
          </div>
          <div>
            <span className="text-gray-600">Completed:</span>
            <span className="font-medium ml-2">{practiceStats.completedPractices}</span>
          </div>
          <div>
            <span className="text-gray-600">Success Rate:</span>
            <span className="font-medium ml-2">
              {practiceStats.totalPractices > 0 
                ? Math.round((practiceStats.completedPractices / practiceStats.totalPractices) * 100) 
                : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarathiConversationPractice
