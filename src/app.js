import findMostSimilarRect from "./findMostSimilarRect";

const bgImg = document.getElementById("bgImg");
const sliderImg = document.getElementById("sliderImg");

const rect = findMostSimilarRect(window.cv, bgImg, sliderImg);

// console.log(rect)
