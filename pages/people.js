import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import peopleData from '../data/people.json';

export default function People() {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPeople(peopleData);
  }, []);

  const filteredPeople = people.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
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
            People & Leaders
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Discover the influential figures who shaped Ethiopian history, culture, and identity through the centuries.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Search by name or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ethiopia-green"
            />
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPeople.map((person) => (
            <motion.div
              key={person.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="card overflow-hidden cursor-pointer"
              onClick={() => setSelectedPerson(person)}
            >
              <div className="h-48 bg-ethiopia-green"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{person.name}</h2>
                <p className="text-ethiopia-red mb-4">{person.title}</p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">{person.biography.substring(0, 120)}...</p>
                <button className="text-ethiopia-green hover:underline font-medium">
                  View Full Profile
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPeople.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No results found for "{searchTerm}"</p>
          </div>
        )}

        {/* Person Detail Modal */}
        <AnimatePresence>
          {selectedPerson && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <motion.div 
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  <div className="h-48 bg-ethiopia-green"></div>
                  <button 
                    onClick={() => setSelectedPerson(null)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{selectedPerson.name}</h2>
                  <p className="text-ethiopia-red font-medium mb-6">{selectedPerson.title}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Biography</h3>
                    <p className="text-gray-700 dark:text-gray-300">{selectedPerson.biography}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Key Achievements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      {selectedPerson.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      onClick={() => {
                        const currentIndex = people.findIndex(p => p.id === selectedPerson.id);
                        if (currentIndex > 0) {
                          setSelectedPerson(people[currentIndex - 1]);
                        }
                      }}
                      disabled={people.findIndex(p => p.id === selectedPerson.id) === 0}
                      className={`px-4 py-2 rounded ${
                        people.findIndex(p => p.id === selectedPerson.id) === 0
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-ethiopia-green text-white hover:bg-opacity-90'
                      }`}
                    >
                      Previous Person
                    </button>
                    
                    <button 
                      onClick={() => {
                        const currentIndex = people.findIndex(p => p.id === selectedPerson.id);
                        if (currentIndex < people.length - 1) {
                          setSelectedPerson(people[currentIndex + 1]);
                        }
                      }}
                      disabled={people.findIndex(p => p.id === selectedPerson.id) === people.length - 1}
                      className={`px-4 py-2 rounded ${
                        people.findIndex(p => p.id === selectedPerson.id) === people.length - 1
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-ethiopia-green text-white hover:bg-opacity-90'
                      }`}
                    >
                      Next Person
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
