import { useState } from 'react';

export const useWeather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        setWeather(null);

        try {
            const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch weather data');
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, fetchWeather };
};
