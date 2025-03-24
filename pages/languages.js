import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import languagesData from '../data/languages.json';

export default function Languages() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setLanguages(languagesData);
    // Set the first language as selected by default
    if (languagesData.length > 0 && !selectedLanguage) {
      setSelectedLanguage(languagesData[0]);
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Languages & Culture
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Explore Ethiopia's linguistic diversity and rich cultural traditions that have evolved over millennia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Language Selection Sidebar */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Ethiopian Languages</h2>
              <div className="space-y-2">
                {languages.map((language) => (
                  <motion.button
                    key={language.id}
                    variants={itemVariants}
                    onClick={() => {
                      setSelectedLanguage(language);
                      setActiveTab('overview');
                    }}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                      selectedLanguage && selectedLanguage.id === language.id
                        ? 'bg-ethiopia-green text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-medium">{language.name}</div>
                    <div className="text-sm opacity-80">{language.speakers} speakers</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Language Details */}
          <div className="lg:col-span-3">
            {selectedLanguage && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('phrases')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'phrases'
                        ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Common Phrases
                  </button>
                  <button
                    onClick={() => setActiveTab('culture')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'culture'
                        ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Cultural Events
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedLanguage.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Speakers</p>
                            <p className="font-medium text-gray-900 dark:text-white">{selectedLanguage.speakers}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Region</p>
                            <p className="font-medium text-gray-900 dark:text-white">{selectedLanguage.region}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Script</p>
                            <p className="font-medium text-gray-900 dark:text-white">{selectedLanguage.script}</p>
                          </div>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                          <p className="text-gray-700 dark:text-gray-300">{selectedLanguage.description}</p>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Listen</h3>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md flex items-center">
                            <button className="p-3 bg-ethiopia-green rounded-full text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <div className="ml-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Sample Audio</p>
                              <p className="font-medium text-gray-900 dark:text-white">{selectedLanguage.name} Pronunciation</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'phrases' && (
                      <motion.div
                        key="phrases"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Common Phrases in {selectedLanguage.name}</h2>
                        <div className="space-y-4">
                          {selectedLanguage.phrases.map((phrase, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                              <div className="flex flex-wrap items-center gap-4">
                                <div className="flex-1">
                                  <p className="text-xl font-medium mb-1 text-gray-900 dark:text-white">{phrase.original}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Transliteration: {phrase.transliteration}</p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">Meaning</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{phrase.meaning}</p>
                                </div>
                                <button className="p-2 bg-ethiopia-green rounded-full text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.072M4.343 5.586a9 9 0 000 12.728" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'culture' && (
                      <motion.div
                        key="culture"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Cultural Events & Traditions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedLanguage.culturalEvents.map((event, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-ethiopia-yellow rounded-full flex items-center justify-center text-white text-xl font-bold">
                                  {index + 1}
                                </div>
                                <div className="ml-4">
                                  <p className="font-medium text-gray-900 dark:text-white">{event}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
