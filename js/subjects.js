import { fetchData } from "./api.js";

const subjectsData = ['Architecture', 'Art & Fashion', 'Biography', 'Business', 'Crafts & Hobbies', 'Drama', 'Fiction', 'Food & Drink',
    'Health & Wellbeing', 'History & Politics', 'Humor', 'Poetry', 'Psychology', 'Science', 'Technology', 'Travel & Maps'
]

const subjectsWrap = document.querySelector('.subjects');
let currentSubject = 'Architecture';

const getSubjects = () => {
    subjectsWrap.innerHTML = subjectsData.map((item, index) => {
        const active = index === 0 ? ' active' : '';
        return `<li class='subject${active}'>${item}</li>`;
    }).join('');
};

const updateSubject = (subjects) => {
    subjects.forEach((item, index) => {
        item.classList.toggle('active', subjectsData[index] === currentSubject);
    });

};

const handleClick = () => {
    const subjects = document.querySelectorAll('.subject');
    subjects.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSubject = subjectsData[index];
            updateSubject(subjects);
            fetchData(currentSubject, 0);
        })
    });
    
};

export { currentSubject, getSubjects, handleClick }