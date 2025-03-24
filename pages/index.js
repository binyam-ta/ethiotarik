import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Feature sections for homepage
  const features = [
    {
      title: 'Timeline of History',
      description: 'Explore key events that shaped Ethiopia from ancient Aksum to modern times with interactive visualizations and rich historical context.',
      icon: '📜',
      link: '/timeline',
      bgColor: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'People & Leaders',
      description: 'Discover the influential figures who defined Ethiopian history and culture through an immersive biographical experience.',
      icon: '👑',
      link: '/people',
      bgColor: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Languages & Culture',
      description: 'Learn about Ethiopia\'s diverse languages, traditions, and cultural heritage through interactive audio samples and visual guides.',
      icon: '🗣️',
      link: '/languages',
      bgColor: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Interactive Map',
      description: 'Navigate through Ethiopia\'s regions and explore their unique characteristics with detailed geographic and cultural information.',
      icon: '🗺️',
      link: '/map',
      bgColor: 'from-blue-500 to-cyan-600'
    }
  ];

  // Stats for the counter section
  const stats = [
    { value: '3,000+', label: 'Years of Recorded History' },
    { value: '80+', label: 'Ethnic Groups' },
    { value: '90+', label: 'Languages Spoken' },
    { value: '9', label: 'UNESCO World Heritage Sites' }
  ];

  return (
    <div>
      {/* Hero Section - Modern Silicon Valley Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient and noise texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-ethiopia-green via-ethiopia-yellow to-ethiopia-red opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/noise.png')] mix-blend-overlay z-10"></div>
        
        {/* Content */}
        <div className="container-custom relative z-30 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover <span className="text-white/90">Ethiopia's</span> Rich Heritage
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-xl">
                Explore the cradle of humanity and one of the world's oldest civilizations through an immersive digital experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/timeline" className="px-8 py-4 bg-white text-ethiopia-green rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  Begin Journey
                </Link>
                <Link href="/map" className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-ethiopia-green transition-all duration-300 hover:-translate-y-1">
                  Explore Map
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* This would be replaced with an actual image in production */}
                <div className="absolute inset-0 bg-gradient-to-br from-ethiopia-green/20 to-ethiopia-red/20 backdrop-blur-sm z-10 rounded-2xl"></div>
                <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Ethiopia</h3>
                    <p className="text-white/80">The Land of Origins</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="flex flex-col items-center">
            <p className="text-white mb-2 text-sm">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Introduction Section with Glass Morphism */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ethiopia-green/5 to-ethiopia-red/5"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              A Journey Through Time
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Ethiopia stands as one of the world's oldest countries, with a history stretching back to the dawn of human civilization. 
              From the ancient Kingdom of Aksum that minted its own currency in the 3rd century, to the only African nation that successfully 
              resisted European colonization, Ethiopia's story is one of remarkable resilience, cultural richness, and historical significance.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-xl"
              >
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-ethiopia-green to-ethiopia-red bg-clip-text text-transparent">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-24 bg-white dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-5"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Explore Ethiopia's Legacy
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Dive into our interactive features designed to bring Ethiopia's rich history and culture to life.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Link href={feature.link} className="block">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <div className={`h-24 bg-gradient-to-r ${feature.bgColor} flex items-center justify-center`}>
                      <div className="text-5xl">{feature.icon}</div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                      <div className="mt-6 flex items-center text-ethiopia-green font-medium">
                        Explore
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Visual Journey
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Experience Ethiopia's breathtaking landscapes, historical sites, and cultural treasures.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-96 bg-ethiopia-green rounded-2xl"></div>
            <div className="h-96 bg-ethiopia-yellow rounded-2xl"></div>
            <div className="h-96 bg-ethiopia-red rounded-2xl"></div>
            <div className="md:col-span-2 h-96 bg-ethiopia-green rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-ethiopia-green to-ethiopia-red text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Explore Ethiopian History?</h2>
            <p className="text-xl mb-8 text-white/90">
              Dive into our interactive timeline, discover influential leaders, learn about diverse cultures, and explore the regional map.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/timeline" className="px-8 py-4 bg-white text-ethiopia-green rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                Start with Timeline
              </Link>
              <Link href="/map" className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-ethiopia-green transition-all duration-300 hover:-translate-y-1">
                Explore the Map
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
