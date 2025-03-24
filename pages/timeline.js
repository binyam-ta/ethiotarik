import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import timelineData from '../data/timeline.json';
import Image from 'next/image';

export default function Timeline() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sort timeline events chronologically
    const sortedEvents = [...timelineData].sort((a, b) => {
      // Extract the first year from the year string (e.g., "1270" from "1270")
      // or the first year from a range (e.g., "100" from "100 CE - 940 CE")
      const getFirstYear = (yearStr) => {
        const match = yearStr.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      };
      
      const yearA = getFirstYear(a.year);
      const yearB = getFirstYear(b.year);
      
      // For BCE dates, reverse the order
      if (a.year.includes('BCE') && b.year.includes('BCE')) {
        return yearB - yearA;
      } else if (a.year.includes('BCE')) {
        return 1; // BCE comes before CE
      } else if (b.year.includes('BCE')) {
        return -1; // CE comes after BCE
      }
      
      return yearA - yearB;
    });
    
    setEvents(sortedEvents);
    
    // Set the first event as selected by default
    if (sortedEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(sortedEvents[0]);
    }
  }, []);

  // Filter events based on search term and period filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    
    if (filter === 'ancient' && (event.year.includes('BCE') || event.year.includes('100 CE'))) {
      return matchesSearch;
    }
    
    if (filter === 'medieval' && (
      event.year.includes('900 CE') || 
      event.year.includes('1270') || 
      event.year.includes('1529')
    )) {
      return matchesSearch;
    }
    
    if (filter === 'modern' && (
      event.year.includes('1855') || 
      event.year.includes('1896') || 
      event.year.includes('1930') || 
      event.year.includes('1936') || 
      event.year.includes('1974') || 
      event.year.includes('1991')
    )) {
      return matchesSearch;
    }
    
    return false;
  });

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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const detailVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Ethiopian History Timeline
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Explore the rich tapestry of Ethiopian history from ancient kingdoms to the modern era.
          </motion.p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search historical events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-ethiopia-green focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-ethiopia-green text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Periods
            </button>
            <button
              onClick={() => setFilter('ancient')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'ancient'
                  ? 'bg-ethiopia-green text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Ancient (Pre-1000 CE)
            </button>
            <button
              onClick={() => setFilter('medieval')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'medieval'
                  ? 'bg-ethiopia-green text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Medieval (1000-1800)
            </button>
            <button
              onClick={() => setFilter('modern')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'modern'
                  ? 'bg-ethiopia-green text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Modern (1800-Present)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Column */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Timeline Events</h2>
                
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No events match your search criteria</p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
                    >
                      {filteredEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          variants={itemVariants}
                          className={`relative pl-10 py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedEvent?.id === event.id
                              ? 'bg-ethiopia-green/10 border border-ethiopia-green'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className={`absolute left-2 top-4 w-4 h-4 rounded-full border-4 ${
                            selectedEvent?.id === event.id
                              ? 'border-ethiopia-green bg-white dark:bg-gray-800'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                          }`}></div>
                          <p className="text-sm font-medium text-ethiopia-green">{event.year}</p>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-ethiopia-green/20 to-ethiopia-red/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Did You Know?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Ethiopia is the only African country that was never colonized, successfully resisting Italian invasion at the Battle of Adwa in 1896.
                </p>
              </div>
            </div>
          </div>

          {/* Event Detail Column */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {selectedEvent ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedEvent.id}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={detailVariants}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Event Image */}
                  <div className="relative h-64 md:h-80 bg-gray-300 dark:bg-gray-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                      <p className="text-ethiopia-yellow font-medium mb-2">{selectedEvent.year}</p>
                      <h2 className="text-3xl font-bold">{selectedEvent.title}</h2>
                      <p className="text-sm mt-2 opacity-80">{selectedEvent.location}</p>
                    </div>
                    <div className="absolute inset-0">
                      <Image
                        src={selectedEvent.image || '/images/placeholder.jpg'}
                        alt={selectedEvent.title}
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        activeTab === 'overview'
                          ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        activeTab === 'details'
                          ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      Detailed History
                    </button>
                    <button
                      onClick={() => setActiveTab('figures')}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        activeTab === 'figures'
                          ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      Key Figures
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {activeTab === 'overview' && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedEvent.description}
                          </p>
                          
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Time Period</h4>
                              <p className="font-medium text-gray-900 dark:text-white">{selectedEvent.year}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h4>
                              <p className="font-medium text-gray-900 dark:text-white">{selectedEvent.location || 'Ethiopia'}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {activeTab === 'details' && (
                        <motion.div
                          key="details"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {selectedEvent.detailedInfo || 'Detailed information not available for this event.'}
                          </p>
                          
                          <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Historical Context</h3>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                              <p className="text-gray-700 dark:text-gray-300">
                                This event occurred during a period of {selectedEvent.year.includes('BCE') ? 'ancient' : selectedEvent.year.includes('CE') && parseInt(selectedEvent.year) < 1500 ? 'medieval' : 'modern'} Ethiopian history, characterized by {
                                  selectedEvent.year.includes('BCE') || selectedEvent.year.includes('100 CE') 
                                    ? 'early state formation and trade networks across the Red Sea and beyond.'
                                    : selectedEvent.year.includes('CE') && parseInt(selectedEvent.year.match(/\d+/)[0]) < 1500
                                      ? 'religious development, architectural achievements, and dynastic rule.'
                                      : 'modernization efforts, resistance to colonialism, and nation-building.'
                                }
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {activeTab === 'figures' && (
                        <motion.div
                          key="figures"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {selectedEvent.keyFigures && selectedEvent.keyFigures.length > 0 ? (
                            <div>
                              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Historical Figures</h3>
                              <div className="space-y-4">
                                {selectedEvent.keyFigures.map((figure, index) => (
                                  <div 
                                    key={index} 
                                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-center"
                                  >
                                    <div className="w-10 h-10 bg-ethiopia-green/20 rounded-full flex items-center justify-center text-ethiopia-green mr-4">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900 dark:text-white">{figure}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                              <p className="text-gray-500 dark:text-gray-400">No key figures information available for this event.</p>
                            </div>
                          )}
                          
                          <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Legacy</h3>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                              <p className="text-gray-700 dark:text-gray-300">
                                {selectedEvent.title.includes('Aksum') ? 'The Aksumite legacy includes early adoption of Christianity, sophisticated architecture, and a writing system still used in Ethiopia today.' :
                                 selectedEvent.title.includes('Adwa') ? 'The Battle of Adwa remains a powerful symbol of African resistance to European colonialism and Ethiopian sovereignty.' :
                                 selectedEvent.title.includes('Selassie') ? 'Haile Selassie\'s legacy includes modernizing Ethiopia, founding the Organization of African Unity, and becoming a symbol for the Rastafarian movement.' :
                                 'This historical period continues to influence Ethiopian national identity, culture, and political development to this day.'}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-900 dark:text-white">Select a Timeline Event</p>
                <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
                  Choose an event from the timeline to view detailed information about that period in Ethiopian history.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
