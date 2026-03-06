import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Award, 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
  Target,
  Heart
} from 'lucide-react'

export default function About() {
  const stats = [
    { number: '10+', label: 'Years of Experience', icon: <Award className="w-8 h-8" /> },
    { number: '2000+', label: 'Successful Students', icon: <Users className="w-8 h-8" /> },
    { number: '50+', label: 'Expert Instructors', icon: <BookOpen className="w-8 h-8" /> },
    { number: '95%', label: 'Success Rate', icon: <TrendingUp className="w-8 h-8" /> }
  ]

  const expertise = [
    {
      title: 'Comprehensive Courses',
      description: 'We offer complete courses in spoken English and IELTS preparation through both online and offline platforms.',
      icon: <BookOpen className="w-12 h-12" />
    },
    {
      title: 'Expert Faculty',
      description: 'Our experienced instructors provide personalized attention and proven teaching methodologies.',
      icon: <Award className="w-12 h-12" />
    },
    {
      title: 'Flexible Learning',
      description: 'Choose between online and offline learning modes with flexible schedules to suit your needs.',
      icon: <Clock className="w-12 h-12" />
    },
    {
      title: 'Results-Driven Approach',
      description: 'Our focus is on delivering measurable results and helping students achieve their goals.',
      icon: <Target className="w-12 h-12" />
    }
  ]

  const achievements = [
    'Successfully guided 2000+ students to study and work abroad',
    'Consistent 7+ band scores in IELTS examinations',
    '95% student satisfaction rate',
    'Partnerships with leading universities and colleges',
    'Award-winning teaching methodology',
    'Comprehensive study materials and resources'
  ]

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & Director',
      experience: '15+ years',
      expertise: 'IELTS Training, English Language Teaching',
      image: '/images/team/sarah.jpg'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Head of Academics',
      experience: '12+ years',
      expertise: 'Curriculum Development, Assessment',
      image: '/images/team/michael.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Senior IELTS Trainer',
      experience: '10+ years',
      expertise: 'IELTS Speaking & Writing',
      image: '/images/team/emily.jpg'
    },
    {
      name: 'James Wilson',
      role: 'Spoken English Expert',
      experience: '8+ years',
      expertise: 'Communication Skills, Business English',
      image: '/images/team/james.jpg'
    }
  ]

  return (
    <>
      <Head>
        <title>About Us - Lexicon Spoken English and IELTS Academy</title>
        <meta name="description" content="Learn about Lexicon Academy - Pune's premier institution for IELTS preparation and spoken English training with 10+ years of experience and 2000+ successful students." />
        <meta name="keywords" content="about lexicon academy, IELTS training Pune, spoken English courses, English academy" />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About <span className="text-yellow-300">Lexicon Academy</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
                Transform Your English. Transform Your Future.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Premier Education for English Excellence
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Lexicon Spoken English and IELTS Academy is a premier educational institution dedicated to helping students master English communication and achieve their IELTS goals. With over 10 years of specialized teaching experience, we have successfully guided more than 2,000 students to study and work abroad.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our mission is to provide high-quality, accessible English language education that empowers students to achieve their academic and professional goals. We believe in creating a supportive learning environment where every student can thrive.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Certified Instructors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Modern Teaching Methods</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Personalized Attention</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Why Choose Lexicon?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <Star className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">10+ Years of Proven Expertise</h4>
                        <p className="text-blue-100">Decade of excellence in English language training</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">2,000+ Success Stories</h4>
                        <p className="text-blue-100">Students achieving their dreams abroad</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">Interactive Learning Workshops</h4>
                        <p className="text-blue-100">Engaging sessions for better retention</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">Flexible Online and Offline Learning</h4>
                        <p className="text-blue-100">Learn at your convenience</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
              <p className="text-xl text-gray-600">Numbers that speak for our success</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
              <p className="text-xl text-gray-600">What makes us the best choice for your English learning journey</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertise.map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements List */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
                <p className="text-xl text-gray-600">Milestones that define our journey</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600">Dedicated professionals committed to your success</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.experience} experience</p>
                  <p className="text-gray-500 text-sm">{member.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Vision */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  To empower individuals with exceptional English language skills, enabling them to achieve their academic and professional aspirations globally. We strive to provide accessible, high-quality education that transforms lives.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  To be the leading English language academy in India, recognized for our innovative teaching methods, exceptional student outcomes, and commitment to excellence in language education.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have transformed their future with Lexicon Academy
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary text-white px-8 py-3 rounded-full font-semibold">
                Enroll Now
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all">
                Schedule a Visit
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
