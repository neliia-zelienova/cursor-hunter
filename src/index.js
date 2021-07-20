import MoveLetter from "./helpers/move-letter.js";

let currentLetter = null;

const positionsArray = [];

const setNewPosition = (e) => {
  currentLetter.style.position = "absolute";
  currentLetter.style.left = `${e.pageX}px`;
  currentLetter.style.top = `${e.pageY}px`;
  const currentIndex = getChildIndex(currentLetter);
  positionsArray.forEach((item, index) => {
    if (
      e.pageX >= parsePosition(item.x) - 5 &&
      e.pageX <= parsePosition(item.x) + 5 &&
      e.pageY >= parsePosition(item.y) - 5 &&
      e.pageY <= parsePosition(item.y) + 5
    ) {
      console.log("inside if");
      item.x = positionsArray[currentIndex].x;
      item.y = positionsArray[currentIndex].y;
      updatePosition(index);
    }
  });
};

const updatePosition = (index) => {
  const parent = currentLetter.parentNode;
  const childrenindex = Array.from(parent.children)[index];
  console.log("updatePosition", childrenindex);
  childrenindex.style.left = `${positionsArray.x}`;
  childrenindex.style.top = positionsArray.y;
};

const parsePosition = (position) => {
  return Number(position.slice(0, 3));
};

const getChildIndex = (item) => {
  const parent = item.parentNode;
  return Array.prototype.indexOf.call(parent.children, item);
};

const controlPosition = (e) => {
  if (currentLetter) {
    const childIndex = getChildIndex(currentLetter);
    const style = getComputedStyle(currentLetter);
    positionsArray[childIndex].x = style.left;
    positionsArray[childIndex].y = style.top;
    console.log("positionsArray", positionsArray);
    container.removeEventListener("mousemove", setNewPosition);
    currentLetter = null;
  }
  if (e.target.classList.contains("drag-letter")) {
    if (!currentLetter) {
      currentLetter = e.target;
      container.addEventListener("mousemove", setNewPosition);
    }
  }
};

const container = document.querySelector(".container");
const button = document.querySelector(".submit-button");
container.addEventListener("click", controlPosition);

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const formRef = document.querySelector(".input");
  const array = createElementArray(formRef.value);
  container.insertAdjacentHTML("beforeend", array);
});

const createElementArray = (word) => {
  const array = word
    .split("")
    .map(
      (item, index) =>
        `<span class="drag-letter" position="absolute" left=${
          index * 200
        }px>${item}</span>`
    );
  array.forEach(() => positionsArray.push({ x: "", y: "" }));
  return `<div>${array.join(" ")}</div>`;
};

const changePosition = () => {};
