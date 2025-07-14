import React from 'react';
import { ArrowRight, BookOpen, Users, Award, Star, PencilIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountCard from '../countCard/CountCard';
import { useTokenStore } from '../../Store/AuthStore';

const Hero = () => {
  const hasToken = useTokenStore((store)=> store.token)

  return (
    
    <section className="relative left-1/2 w-screen max-w-none -translate-x-1/2 pt-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Inspiring Stories
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-md">
                Where creativity meets culture. Explore thought-provoking articles on art, design, and the stories that shape our world.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {hasToken ? (
                <>
                  <Link
                    to="/cms/articalCreate"
                    className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span>Start Writing</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to='/cms/articalList'
                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Browse Articles
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/register"
                    className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                  >
                    <span>Sign Up</span>
                  </Link>
                  <Link
                    to='/auth/login'
                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2 min-w-[100px]">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Articles</div>
                  <div className="font-semibold text-gray-900 dark:text-white">500+</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 min-w-[100px]">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Readers</div>
                  <div className="font-semibold text-gray-900 dark:text-white">10K+</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 min-w-[100px]">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Awards</div>
                  <div className="font-semibold text-gray-900 dark:text-white">25+</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image with Rating Card */}
          <div className="relative flex justify-center items-center">
            <div className="relative z-10 w-full max-w-lg mx-auto">
              <img
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Digital Art"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[4/3] max-h-[400px] sm:max-h-[500px]"
              />

              {/* CountCard: only show on md+ screens */}
              <div className='absolute -bottom-2 -left-2 hidden md:block'>
                <CountCard />
              </div>

              {/* Floating Rating Card */}
              <div className="absolute -top-2 -right-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 dark:border-gray-700/20 animate-fade-in">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  4.9/5
                </div>
                {/* Mini avatars */}
                <div className="flex items-center -space-x-1">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Reader"
                    className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Reader"
                    className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                  <img
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Reader"
                    className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-44 h-44 sm:w-72 sm:h-72 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-3xl pointer-events-none hidden sm:block"></div>
            <div className="absolute -bottom-4 -left-4 w-44 h-44 sm:w-72 sm:h-72 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl opacity-20 blur-3xl pointer-events-none hidden sm:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
