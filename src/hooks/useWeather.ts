import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { getCurrentWeather } from '~/services/weatherService';

export interface WeatherState {
    temp: number;
    text: string;
    city: string;
    icon: string;
    isDay: boolean;
}

export const useWeather = (city = 'Hanoi') => {
    const [weather, setWeather] = useState<WeatherState | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            const data = await getCurrentWeather(city);
            setWeather({
                temp: Math.round(data.current.temp_c),
                text: data.current.condition.text,
                city: data.location.name,
                icon: data.current.condition.icon,
                isDay: data.current.is_day === 1,
            });
        } catch (err) {
            console.log('❌ WeatherAPI error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();

        const interval = setInterval(fetchWeather, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, [city]);

    useEffect(() => {
        const sub = AppState.addEventListener('change', state => {
            if (state === 'active') {
                fetchWeather();
            }
        });
        return () => sub.remove();
    }, []);

    return {
        weather,
        loading,
        refresh: fetchWeather,
    };
};
