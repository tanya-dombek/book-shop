import { fetchData } from "./api.js";
import { getSubjects, handleClick } from "./subjects.js";
import { initializeSlider } from "./slider.js";
import "../css/styles.scss";

document.addEventListener('DOMContentLoaded', () => {
    fetchData('Architecture', 0);
    getSubjects();
    initializeSlider();
    handleClick();
});