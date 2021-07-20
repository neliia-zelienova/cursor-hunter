import MoveLetter from "./helpers/move-letter.js";

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const formRef = document.querySelector(".input");
  const moveLetter = new MoveLetter(formRef.value);
});
