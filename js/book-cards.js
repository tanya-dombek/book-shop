import { fetchData } from "./api.js";
import { currentSubject } from "./subjects.js";
import { generateStarIcons } from './utils.js';
import { updateCartCounter, handleCart } from "./cart.js";

const loadBtn = document.querySelector('.load');
const container = document.querySelector('.books-container');

export let booksCount = 0;

const createBookCard = (book) => {
    const inStock = book.saleInfo.listPrice;
    const averageRating = book.volumeInfo.averageRating || 0;
    const ratingsCount = book.volumeInfo.ratingsCount || 0;
    const starsHTML = averageRating ? generateStarIcons(averageRating) : '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const inCart = cart.some(cartItem => cartItem.title === book.volumeInfo.title);
    return `
        <div class="book-card">
            <img src="${book.volumeInfo.imageLinks?.thumbnail || '../img/default.png'}" alt="${book.volumeInfo.title}">
            <div class="book-info">
                <p>${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                <h2>${book.volumeInfo.title}</h2>
                <p class="description">${book.volumeInfo.description || 'No description available'}</p>
                ${averageRating && ratingsCount ? `
                <div class="rating">
                    <div>${starsHTML}</div>
                    <p>${ratingsCount} review</p>
                </div>
                ` : ''}
                <h3>${inStock?.amount ? `${inStock.currencyCode} ${inStock.amount}` : ''}</h3>
                <button class="button bookCardBtn${!inStock ? ` disabled` : ''} ${inCart ? 'inCart' : ''}">
                    ${!inStock ? `Out of stock` : inCart ? 'In the cart' : 'Buy Now'}
                </button>
            </div>
        </div>
    `;
};

export const renderBookCards = (data, startIndex) => {
    booksCount = startIndex;
    booksCount === 0 ? container.innerHTML = '' : container.removeChild(loadBtn);
    data.items.forEach(book => {
        const bookCardHTML = createBookCard(book);
        container.innerHTML += bookCardHTML;
    });
    container.appendChild(loadBtn);
    updateCartCounter();
};

loadBtn.addEventListener('click', () => {
    booksCount += 6;
    fetchData(currentSubject, booksCount);
});

container.addEventListener('click', handleCart);