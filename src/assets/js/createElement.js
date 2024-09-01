export function createElement(tagName, parentNode, classNames) {
  const newElement = document.createElement(tagName);
  newElement.classList.add(...classNames);
  parentNode.appendChild(newElement);
  return newElement;
}
