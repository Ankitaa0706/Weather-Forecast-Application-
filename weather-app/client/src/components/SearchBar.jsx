import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="glass-panel rounded-full flex items-center p-2 mb-12 max-w-md w-full mx-auto transition-all duration-300 focus-within:ring-2 focus-within:ring-white/20 hover:bg-white/5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Search className="text-white opacity-50 ml-4" size={20} />
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search city..."
                className="input-reset flex-1 px-4 py-3 text-white placeholder-white/30 text-lg font-medium tracking-wide"
            />
        </motion.form>
    );
};

export default SearchBar;
