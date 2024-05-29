import { renderBookCards } from "./book-cards.js";

const API_KEY = 'AIzaSyDi7ZqwPvQfKvBZOE75VsLXXdkGG271aZ8';

export const fetchData = async (subject, startIndex) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${API_KEY}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;
    try {
        const data = await fetch(url);
        const response = await data.json();
        if (response) {
            renderBookCards(response, startIndex);
        }
    } catch (error) {
        console.error(error.message);
    }
};