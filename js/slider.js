let currentIndex = 0;
const data = ['./img/banner.png', './img/banner 2.png', './img/banner 3.png']

const img = document.querySelector('.banner');
const rectangles = document.querySelectorAll('.rec');


const setData = (index) => {
    img.src = data[index];
};

const updateRectangles = () => {
    rectangles.forEach((rectangle, index) => {
        rectangle.classList.toggle('active', index === currentIndex);
    });
};

const changeSlide = () => {
    currentIndex = (currentIndex + 1) % data.length;
    updateRectangles();
    setData(currentIndex);
};

rectangles.forEach((rectangle, index) => {
    rectangle.addEventListener('click', () => {
        currentIndex = index;
        updateRectangles();
        setData(index);
    })
});


const initializeSlider = () => {
    setData(0);
    updateRectangles();
    setInterval(changeSlide, 5000);
};

export { initializeSlider, changeSlide, updateRectangles, setData };