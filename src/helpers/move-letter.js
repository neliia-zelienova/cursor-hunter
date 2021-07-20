import { getChildIndex, parsePosition } from "./utils.js";

const LETTER_SPACING = 25;
const LETTERS_START_POS_TOP = 40;

class MoveLetter {
  constructor(word) {
    this.lastPositions = this.createPositionsArray(word);
    this.array = this.createElementArray(word, this.lastPositions);
    this.currentLetter = null;
    this.containerRef = document.querySelector(".container");
    this.containerRef.insertAdjacentHTML(
      "beforeend",
      `<div>${this.array.join(" ")}</div>`
    );
    this.containerRef.addEventListener("click", this.controlPosition);
  }

  createPositionsArray = (word) => {
    return word.split("").map((_, index) => ({
      x: `${30 + index * LETTER_SPACING}px`,
      y: `${LETTERS_START_POS_TOP}px`,
    }));
  };

  createElementArray = (word, positions) => {
    return word
      .split("")
      .map(
        (item, index) =>
          `<span class="drag-letter" style="left: ${positions[index].x}; top:${positions[index].y}" >${item}</span>`
      );
  };

  controlPosition = (e) => {
    if (this.currentLetter) {
      const childIndex = getChildIndex(this.currentLetter);
      const style = getComputedStyle(this.currentLetter);
      this.lastPositions[childIndex].x = style.left;
      this.lastPositions[childIndex].y = style.top;
      this.containerRef.removeEventListener("mousemove", this.setNewPosition);
      this.currentLetter = null;
    }
    if (e.target.classList.contains("drag-letter")) {
      if (!this.currentLetter) {
        this.currentLetter = e.target;
        this.containerRef.addEventListener("mousemove", this.setNewPosition);
      }
    }
  };

  setNewPosition = (e) => {
    this.currentLetter.style.left = `${e.pageX}px`;
    this.currentLetter.style.top = `${e.pageY}px`;
    const currentIndex = getChildIndex(this.currentLetter);
    this.lastPositions.forEach((item, index) => {
      if (index !== currentIndex) {
        if (
          e.pageX >= parsePosition(item.x) - 5 &&
          e.pageX <= parsePosition(item.x) + 5 &&
          e.pageY >= parsePosition(item.y) - 5 &&
          e.pageY <= parsePosition(item.y) + 5
        ) {
          this.updatePosition(
            index,
            this.lastPositions[currentIndex].x,
            this.lastPositions[currentIndex].y
          );
        }
      }
    });
  };

  updatePosition = (index, x, y) => {
    const parent = this.currentLetter.parentNode;
    const childrenindex = Array.from(parent.children)[index];
    this.lastPositions[index].x = x;
    this.lastPositions[index].y = y;
    childrenindex.style.left = this.lastPositions[index].x;
    childrenindex.style.top = this.lastPositions[index].y;
  };
}

export default MoveLetter;
