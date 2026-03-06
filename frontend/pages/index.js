import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  Play, 
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  MessageSquare,
  FileText,
  Video,
  Headphones,
  Mic
} from 'lucide-react'

export default function Home() {
  const [activeTest, setActiveTest] = useState(null)

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Expert Faculty',
      description: 'Learn from certified IELTS trainers with 10+ years of experience'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '2000+ Students',
      description: 'Join thousands of successful students achieving their dreams'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Proven Results',
      description: 'High success rate with students scoring 7+ bands in IELTS'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Timing',
      description: 'Online and offline classes with flexible schedules'
    }
  ]

  const courses = [
    {
      title: 'IELTS Academic',
      description: 'Complete preparation for IELTS Academic test',
      duration: '8 weeks',
      price: '₹12,000',
      features: ['Reading & Writing', 'Speaking Practice', 'Mock Tests', 'Band 7+ Guarantee'],
      image: '/images/ielts-academic.jpg'
    },
    {
      title: 'IELTS General',
      description: 'Comprehensive training for IELTS General test',
      duration: '6 weeks',
      price: '₹10,000',
      features: ['General Training', 'Immigration Focus', 'Practice Materials', 'Score Improvement'],
      image: '/images/ielts-general.jpg'
    },
    {
      title: 'Spoken English',
      description: 'Master English communication skills',
      duration: '12 weeks',
      price: '₹8,000',
      features: ['Daily Conversation', 'Grammar Focus', 'Pronunciation', 'Confidence Building'],
      image: '/images/spoken-english.jpg'
    }
  ]

  const testTypes = [
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Reading Test',
      description: 'Practice academic and general reading passages',
      time: '60 minutes',
      questions: '40 questions'
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: 'Listening Test',
      description: 'Improve listening skills with audio exercises',
      time: '30 minutes',
      questions: '40 questions'
    },
    {
      icon: <Mic className="w-12 h-12" />,
      title: 'Speaking Test',
      description: 'Practice speaking with mock interviews',
      time: '14 minutes',
      questions: '3 parts'
    },
    {
      icon: <Video className="w-12 h-12" />,
      title: 'Writing Test',
      description: 'Master task 1 and task 2 writing',
      time: '60 minutes',
      questions: '2 tasks'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      course: 'IELTS Academic',
      score: 'Band 8.0',
      image: '/images/student1.jpg',
      content: 'Lexicon Academy helped me achieve my dream score. The personalized attention and mock tests were invaluable.'
    },
    {
      name: 'Rahul Verma',
      course: 'Spoken English',
      score: 'Fluent Speaker',
      image: '/images/student2.jpg',
      content: 'I gained so much confidence in speaking English. The trainers are amazing and the methods are very practical.'
    },
    {
      name: 'Anita Desai',
      course: 'IELTS General',
      score: 'Band 7.5',
      image: '/images/student3.jpg',
      content: 'Thanks to Lexicon, I cleared my IELTS exam in first attempt. The study materials and practice tests were excellent.'
    }
  ]

  return (
    <>
      <Head>
        <title>Lexicon Spoken English and IELTS Academy - Pune</title>
        <meta name="description" content="Join Lexicon Academy for expert IELTS preparation and spoken English courses. 10+ years experience, 2000+ successful students. Located in Shivane, Pune." />
        <meta name="keywords" content="IELTS preparation, spoken English, English coaching, Pune, Shivane, IELTS classes, English speaking course" />
        <link rel="canonical" href="https://lexiconacademy.com" />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Master English & <br />
                  <span className="text-yellow-300">Achieve Your Dreams</span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100">
                  Join Pune's premier academy for IELTS preparation and Spoken English training
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                    Start Free Trial
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">
                    <Play className="inline-block w-5 h-5 mr-2" />
                    Watch Demo
                  </button>
                </div>
                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-yellow-300">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-blue-100">2000+ Successful Students</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">Free IELTS Assessment</h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
                    />
                    <select className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none focus:border-white">
                      <option value="">Select Course</option>
                      <option value="ielts-academic">IELTS Academic</option>
                      <option value="ielts-general">IELTS General</option>
                      <option value="spoken-english">Spoken English</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                    >
                      Get Free Assessment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Lexicon Academy?</h2>
              <p className="text-xl text-gray-600">Experience the difference with our proven teaching methods</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Popular Courses</h2>
              <p className="text-xl text-gray-600">Choose the right course to achieve your goals</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                      <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full btn-primary text-white py-3 rounded-lg font-semibold">
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Tests Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">IELTS Practice Tests</h2>
              <p className="text-xl text-gray-600">Practice all four modules with real test simulations</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testTypes.map((test, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center card-hover cursor-pointer" onClick={() => setActiveTest(test.title)}>
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {test.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.title}</h3>
                  <p className="text-gray-600 mb-4">{test.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>⏱️ {test.time}</p>
                    <p>📝 {test.questions}</p>
                  </div>
                  <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700">
                    Start Practice <ArrowRight className="inline-block w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
              <p className="text-xl text-gray-600">Hear from our successful students</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.course}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {testimonial.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Future?</h2>
            <p className="text-xl mb-8">Join thousands of successful students at Lexicon Academy</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Book Free Demo Class
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
