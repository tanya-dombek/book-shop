export const generateStarIcons = (averageRating) => {
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="full-star fas fa-star"></i>';
    }
    if (halfStar) {
        starsHTML += '<i class="half-star fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="empty-star fas fa-star"></i>';
    }
    return starsHTML;
};

export const manageLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};