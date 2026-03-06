import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Clock } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Spoken English Course', href: '/spoken-english' },
    { name: 'IELTS Preparation', href: '/ielts-preparation' },
    { name: 'Practice Tests', href: '/practice-tests' },
    { name: 'Video Lessons', href: '/video-lessons' },
    { name: 'Student Dashboard', href: '/dashboard' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const courses = [
    { name: 'IELTS Academic', href: '/courses/ielts-academic' },
    { name: 'IELTS General', href: '/courses/ielts-general' },
    { name: 'Spoken English Basic', href: '/courses/spoken-english-basic' },
    { name: 'Spoken English Advanced', href: '/courses/spoken-english-advanced' },
    { name: 'Business English', href: '/courses/business-english' },
    { name: 'Pronunciation Course', href: '/courses/pronunciation' },
  ]

  const resources = [
    { name: 'IELTS Tips', href: '/resources/ielts-tips' },
    { name: 'Band Score Strategies', href: '/resources/band-score-strategies' },
    { name: 'Sample Questions', href: '/resources/sample-questions' },
    { name: 'Writing Task Examples', href: '/resources/writing-examples' },
    { name: 'Speaking Topics', href: '/resources/speaking-topics' },
    { name: 'Grammar Exercises', href: '/resources/grammar-exercises' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Lexicon Academy</h3>
                <p className="text-sm text-gray-400">Spoken English & IELTS</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Transform Your English. Transform Your Future. Join over 2,000 successful students who have achieved their dreams with our expert guidance.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-sm">
                  Sr. No. 6/1k, Flat No. D-20, Vilasnagar Society,<br />
                  Deshmukhwadi, NDA Rd, Shivane, Pune – 411023<br />
                  Near Kala Halwai Shivane
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} className="text-blue-400" />
                <span className="text-sm">9767973647 | 7972492325</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} className="text-blue-400" />
                <span className="text-sm">info@lexiconacademy.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock size={16} className="text-blue-400" />
                <span className="text-sm">Mon-Sat: 9AM-8PM | Sun: 10AM-6PM</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Courses</h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Lexicon Spoken English and IELTS Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
