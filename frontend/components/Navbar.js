import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, MapPin, LogOut, User } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    window.location.href = '/'
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Spoken English', href: '/spoken-english' },
    { name: 'IELTS Preparation', href: '/ielts-preparation' },
    { name: 'Practice Tests', href: '/practice-tests' },
    { name: 'Video Lessons', href: '/video-lessons' },
    { name: 'Contact', href: '/contact' },
  ]

  const authItems = isLoggedIn
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: User },
        { name: 'Logout', href: '#', onClick: handleLogout, icon: LogOut }
      ]
    : [
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' }
      ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span>9767973647 | 7972492325</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Mail size={14} />
                <span>info@lexiconacademy.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span className="hidden sm:inline">Shivane, Pune</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Lexicon</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Spoken English & IELTS</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              {authItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group flex items-center space-x-1"
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group flex items-center space-x-1"
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="btn-primary text-white px-6 py-2 rounded-full font-semibold"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="btn-primary text-white px-6 py-2 rounded-full font-semibold"
                >
                  Get Started
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {authItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.onClick()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              {!isLoggedIn && (
                <Link
                  href="/register"
                  className="block w-full text-center btn-primary text-white px-6 py-2 rounded-full font-semibold mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
