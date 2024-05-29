import { manageLocalStorage } from './utils.js';

const cartCounter = document.querySelector('.cart-counter');

export const handleCart = (event) => {
    if (event.target.classList.contains('bookCardBtn') && !event.target.classList.contains('disabled')) {
        const bookCard = event.target.closest('.book-card');
        const bookTitle = bookCard.querySelector('h2').textContent;
        event.target.classList.toggle('inCart');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (event.target.classList.contains('inCart')) {
            event.target.textContent = 'In the cart';
            const bookInfo = {
                title: bookTitle,
                authors: bookCard.querySelector('p').textContent,
                price: bookCard.querySelector('h3').textContent
            };
            const bookExists = cart.some(book => book.title === bookTitle);
            if (!bookExists) {
                cart.push(bookInfo);
            }
        } else {
            event.target.textContent = 'Buy Now';
            cart = cart.filter(book => book.title !== bookTitle);
        }

        manageLocalStorage(cart);
        updateCartCounter();
    }
};

export const updateCartCounter = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCounter.textContent = cart.length;
    cartCounter.style.display = cart.length > 0 ? 'block' : 'none';
};