import axios from 'axios';

export const getNews = async (lang) => {
    const url = `https://releases.webitel.com/news/feed-${lang}.json`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};