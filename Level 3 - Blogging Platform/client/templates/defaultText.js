const createDefaultText = (container, text) => {
  container.classList.add("default-text__container");
  const textContainer = document.createElement("p");
  textContainer.innerText = text;
  textContainer.classList.add("default-text");

  container.appendChild(textContainer);
};
