import React from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const { weather, loading, error, fetchWeather } = useWeather();

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-lg flex flex-col items-center"
      >
        <h1 className="text-5xl font-bold mb-2 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
          Weather.
        </h1>
        <p className="text-white/50 mb-10 text-center">Forecast & Conditions</p>

        <SearchBar onSearch={handleSearch} />

        <div className="w-full min-h-[400px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Loader2 className="animate-spin text-white/50" size={48} />
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel p-6 rounded-2xl text-center max-w-sm absolute"
              >
                <AlertCircle className="mx-auto mb-4 text-red-400" size={48} />
                <h3 className="text-xl font-bold text-red-200 mb-2">Error</h3>
                <p className="text-white/70">{error}</p>
              </motion.div>
            )}

            {weather && !loading && !error && (
              <WeatherCard weather={weather} />
            )}

            {!weather && !loading && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/30 text-center"
              >
                Enter a city to see the weather
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
