import axios from 'axios';

const API_KEY = 'aaed457312d54d5fbc7104124262601';

export const getCurrentWeather = async (city: string) => {
    const res = await axios.get(
        'https://api.weatherapi.com/v1/current.json',
        {
            params: {
                key: API_KEY,
                q: city,
                lang: 'vi',
            },
        }
    );

    return res.data;
};
