import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BookOpen, FileText, Mic, BarChart3, User, Settings } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const dashboardItems = [
    {
      title: 'Practice Tests',
      description: 'Take IELTS practice tests',
      href: '/practice-tests',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Speaking Tests',
      description: 'Practice speaking exercises',
      href: '/practice-tests/speaking',
      icon: Mic,
      color: 'bg-green-500'
    },
    {
      title: 'My Results',
      description: 'View your test results',
      href: '/results',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      title: 'Courses',
      description: 'Browse available courses',
      href: '/courses',
      icon: BookOpen,
      color: 'bg-orange-500'
    },
    {
      title: 'Profile',
      description: 'Manage your profile',
      href: '/profile',
      icon: User,
      color: 'bg-indigo-500'
    },
    {
      title: 'Settings',
      description: 'Account settings',
      href: '/settings',
      icon: Settings,
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Tests Taken
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {user.testResults?.length || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Courses Enrolled
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {user.enrolledCourses?.length || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Score
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {user.testResults?.length > 0
                        ? Math.round(user.testResults.reduce((acc, result) => acc + (result.bandScore || 0), 0) / user.testResults.length)
                        : 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${item.color} rounded-md p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}