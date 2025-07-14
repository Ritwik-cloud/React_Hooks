import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Eye, Users } from 'lucide-react';

const About = () => {
  return (
    <section className="relative left-1/2 w-screen max-w-none -translate-x-1/2
      py-10 sm:py-14 md:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                About <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Artica</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                We believe that great stories have the power to inspire, educate, and transform. Artica is more than just a platform—it's a community where creativity meets culture.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Our curated collection features thought-provoking articles on art, design, and cultural movements that shape our world. From emerging artists to established masters, we celebrate creativity in all its forms.
              </p>
            </div>

            {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  {/* Passion */}
  <div className="flex flex-col items-center text-center space-y-2">
    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-1">
      <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
    </div>
    <div>
      <div className="font-semibold text-gray-900 dark:text-white">Passion</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">For creative excellence</div>
    </div>
  </div>
  {/* Vision */}
  <div className="flex flex-col items-center text-center space-y-2">
    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-1">
      <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
    </div>
    <div>
      <div className="font-semibold text-gray-900 dark:text-white">Vision</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">To inspire through stories</div>
    </div>
  </div>
  {/* Community */}
  <div className="flex flex-col items-center text-center space-y-2">
    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-1">
      <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
    </div>
    <div>
      <div className="font-semibold text-gray-900 dark:text-white">Community</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">Building connections</div>
    </div>
  </div>
</div>

            {/* CTA */}
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium group mt-6 sm:mt-8"
            >
              <span>Learn more about our mission</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative w-full">
            <div className="aspect-video rounded-2xl shadow-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About Artica"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
