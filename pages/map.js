import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import regionsData from '../data/regions.json';
import Image from 'next/image';

export default function Map() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [mapView, setMapView] = useState('political'); // 'political' or 'satellite'

  useEffect(() => {
    setRegions(regionsData);
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
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Interactive Map of Ethiopia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Explore Ethiopia's diverse regions, each with its unique cultures, histories, and landscapes.
            Click on any region to learn more about its rich heritage.
          </motion.p>
        </div>

        {/* Map View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
            <button
              onClick={() => setMapView('political')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                mapView === 'political'
                  ? 'bg-ethiopia-green text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Political Map
            </button>
            <button
              onClick={() => setMapView('satellite')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                mapView === 'satellite'
                  ? 'bg-ethiopia-green text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Satellite View
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="relative aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                  {/* Accurate Ethiopia Map */}
                  <div className="w-full h-full relative">
                    {/* Base map image */}
                    <div className="relative w-full h-full">
                      <Image 
                        src={mapView === 'political' ? '/images/ethiopia-political-map.png' : '/images/ethiopia-satellite-map.png'} 
                        alt="Map of Ethiopia" 
                        layout="fill" 
                        objectFit="contain"
                        className="rounded-xl"
                      />
                    </div>
                    
                    {/* Interactive region overlays - These would be SVG paths matching the actual geography */}
                    <div className="absolute inset-0">
                      {/* These coordinates would be replaced with accurate SVG paths for each region */}
                      <svg viewBox="0 0 800 600" className="w-full h-full">
                        <g className="region-overlays">
                          {/* Tigray */}
                          <path 
                            d="M450,100 L520,130 L540,200 L480,230 L420,210 L400,150 Z" 
                            className={`region-path ${selectedRegion?.id === 1 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 1))}
                            stroke={selectedRegion?.id === 1 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Amhara */}
                          <path 
                            d="M400,150 L420,210 L480,230 L460,300 L380,330 L340,270 L360,190 Z" 
                            className={`region-path ${selectedRegion?.id === 2 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 2))}
                            stroke={selectedRegion?.id === 2 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Oromia */}
                          <path 
                            d="M340,270 L380,330 L460,300 L500,350 L480,450 L380,500 L300,470 L250,400 L280,330 Z" 
                            className={`region-path ${selectedRegion?.id === 3 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 3))}
                            stroke={selectedRegion?.id === 3 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Somali */}
                          <path 
                            d="M500,350 L580,370 L600,450 L550,530 L480,450 Z" 
                            className={`region-path ${selectedRegion?.id === 4 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 4))}
                            stroke={selectedRegion?.id === 4 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Afar */}
                          <path 
                            d="M480,230 L540,200 L580,250 L560,330 L500,350 L460,300 Z" 
                            className={`region-path ${selectedRegion?.id === 5 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 5))}
                            stroke={selectedRegion?.id === 5 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* SNNPR */}
                          <path 
                            d="M250,400 L300,470 L280,530 L220,500 L200,430 Z" 
                            className={`region-path ${selectedRegion?.id === 6 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 6))}
                            stroke={selectedRegion?.id === 6 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Gambela */}
                          <path 
                            d="M180,430 L200,430 L220,500 L180,510 L150,470 Z" 
                            className={`region-path ${selectedRegion?.id === 7 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 7))}
                            stroke={selectedRegion?.id === 7 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Benishangul-Gumuz */}
                          <path 
                            d="M280,330 L340,270 L360,190 L300,170 L240,210 L220,270 Z" 
                            className={`region-path ${selectedRegion?.id === 8 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 8))}
                            stroke={selectedRegion?.id === 8 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Harari (small region) */}
                          <circle
                            cx="520"
                            cy="400"
                            r="12"
                            className={`region-path ${selectedRegion?.id === 9 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 9))}
                            stroke={selectedRegion?.id === 9 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Dire Dawa (small region) */}
                          <circle
                            cx="540"
                            cy="370"
                            r="12"
                            className={`region-path ${selectedRegion?.id === 10 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 10))}
                            stroke={selectedRegion?.id === 10 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                          
                          {/* Addis Ababa (capital) */}
                          <circle
                            cx="380"
                            cy="370"
                            r="15"
                            className={`region-path ${selectedRegion?.id === 11 ? 'fill-ethiopia-red opacity-40' : 'fill-transparent hover:fill-ethiopia-green hover:opacity-30'}`}
                            onClick={() => setSelectedRegion(regions.find(r => r.id === 11))}
                            stroke={selectedRegion?.id === 11 ? '#e74c3c' : '#2ecc71'}
                            strokeWidth="2"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Click on a region to view detailed information
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Map Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className={`flex items-center text-left p-2 rounded-lg transition-all duration-200 ${
                      selectedRegion?.id === region.id
                        ? 'bg-ethiopia-green/10 border border-ethiopia-green'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      selectedRegion?.id === region.id ? 'bg-ethiopia-red' : 'bg-ethiopia-green'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{region.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Region Info Column */}
          <div className="lg:col-span-1">
            {selectedRegion ? (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={detailVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full"
              >
                {/* Header with image */}
                <div className="relative h-48 bg-gradient-to-r from-ethiopia-green to-ethiopia-red overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 z-10"></div>
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                    <h2 className="text-2xl font-bold">{selectedRegion.name}</h2>
                    <p className="text-white/80">Capital: {selectedRegion.capital}</p>
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
                    onClick={() => setActiveTab('culture')}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === 'culture'
                        ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Culture
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === 'history'
                        ? 'border-b-2 border-ethiopia-green text-ethiopia-green'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    History
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto" style={{ maxHeight: '500px' }}>
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-6">
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Population</p>
                            <p className="font-medium text-gray-900 dark:text-white">{selectedRegion.population}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Description</p>
                            <p className="text-gray-700 dark:text-gray-300">{selectedRegion.description}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Major Ethnic Groups</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedRegion.ethnicGroups.map((group, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-1 bg-ethiopia-yellow/20 text-ethiopia-yellow dark:text-yellow-400 border border-ethiopia-yellow/30 rounded-full text-xs font-medium"
                                >
                                  {group}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'culture' && (
                      <motion.div
                        key="culture"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Cultural Highlights</h3>
                        <div className="space-y-4">
                          {selectedRegion.culturalHighlights.map((highlight, index) => (
                            <div 
                              key={index} 
                              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-start"
                            >
                              <div className="w-8 h-8 bg-ethiopia-green rounded-full flex items-center justify-center text-white font-medium mr-3 flex-shrink-0">
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-gray-900 dark:text-white">{highlight}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'history' && (
                      <motion.div
                        key="history"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Historical Significance</h3>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                          <p className="text-gray-700 dark:text-gray-300">{selectedRegion.historicalSignificance}</p>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Timeline Highlights</h4>
                          <div className="relative border-l-2 border-ethiopia-green pl-6 ml-3 space-y-6">
                            {/* These would be dynamically populated based on the region */}
                            <div className="relative">
                              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-ethiopia-green"></div>
                              <p className="text-sm text-ethiopia-green font-medium">Ancient Period</p>
                              <p className="text-gray-700 dark:text-gray-300">Early settlements and development</p>
                            </div>
                            <div className="relative">
                              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-ethiopia-green"></div>
                              <p className="text-sm text-ethiopia-green font-medium">Medieval Period</p>
                              <p className="text-gray-700 dark:text-gray-300">Kingdom formations and religious developments</p>
                            </div>
                            <div className="relative">
                              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-ethiopia-green"></div>
                              <p className="text-sm text-ethiopia-green font-medium">Modern Era</p>
                              <p className="text-gray-700 dark:text-gray-300">Recent developments and cultural renaissance</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select a Region</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Click on any region on the map to explore its history, culture, and significance in Ethiopian heritage.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
