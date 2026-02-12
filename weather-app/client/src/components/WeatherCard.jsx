import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    const { name, main, weather: weatherDetails, wind } = weather;
    const currentTemp = Math.round(main.temp);
    const description = weatherDetails[0].description;
    const iconCode = weatherDetails[0].icon;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="glass-panel rounded-[2rem] p-10 max-w-md w-full mx-auto text-white relative overflow-hidden"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Background enhancement */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />

            <motion.div variants={item} className="flex flex-col items-center mb-8 text-center">
                <h2 className="text-4xl font-bold mb-2 tracking-tight">{name}</h2>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                    <img
                        src={`https://openweathermap.org/img/wn/${iconCode}.png`}
                        alt={description}
                        className="w-6 h-6"
                    />
                    <p className="text-sm font-medium opacity-90 capitalize tracking-wide">{description}</p>
                </div>
            </motion.div>

            <motion.div variants={item} className="flex justify-center items-center -my-4 relative z-10">
                <span className="text-[10rem] leading-none font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 drop-shadow-2xl">
                    {currentTemp}°
                </span>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 gap-4 mt-8">
                <div className="glass-panel bg-white/[0.03] border-white/[0.05] rounded-2xl p-4 flex flex-col items-center justify-center transition-colors hover:bg-white/[0.07]">
                    <Droplets className="mb-2 text-blue-300 opacity-80" size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Humidity</span>
                    <span className="text-xl font-bold tabular-nums">{main.humidity}%</span>
                </div>
                <div className="glass-panel bg-white/[0.03] border-white/[0.05] rounded-2xl p-4 flex flex-col items-center justify-center transition-colors hover:bg-white/[0.07]">
                    <Wind className="mb-2 text-cyan-300 opacity-80" size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Wind</span>
                    <span className="text-xl font-bold tabular-nums">{wind.speed} <span className="text-sm font-medium opacity-50">m/s</span></span>
                </div>
                <div className="glass-panel bg-white/[0.03] border-white/[0.05] rounded-2xl p-4 flex flex-col items-center justify-center transition-colors hover:bg-white/[0.07]">
                    <Thermometer className="mb-2 text-rose-300 opacity-80" size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Feels Like</span>
                    <span className="text-xl font-bold tabular-nums">{Math.round(main.feels_like)}°</span>
                </div>
                <div className="glass-panel bg-white/[0.03] border-white/[0.05] rounded-2xl p-4 flex flex-col items-center justify-center transition-colors hover:bg-white/[0.07]">
                    <Cloud className="mb-2 text-white/80" size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Pressure</span>
                    <span className="text-xl font-bold tabular-nums">{main.pressure} <span className="text-sm font-medium opacity-50">hPa</span></span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default WeatherCard;
