import { createElement } from "./createElement";

export function generateCongratulateModal() {
  const modalNode = createElement("div", document.body, ["modal", "hidden", "modal__congratulate"]);
  const modalContentBlockNode = createElement("div", modalNode, [
    "modal__content-block",
    "congratulate-block",
  ]);

  const spentTimeSpan = createElement("span", modalContentBlockNode, []);
  spentTimeSpan.innerHTML = "Great! You have solved the nonogram in";
  const spentTimeNode = createElement("span", modalContentBlockNode, []);
  const startNewGameBtn = createElement("button", modalContentBlockNode, [
    "congratulate-block__new-game-btn",
    "text-block",
    "text-block--dark",
  ]);
  const newGameBtnText = createElement("span", startNewGameBtn, []);
  newGameBtnText.innerHTML = "new game";
  let congratulateModalListener;
  return { modalNode, congratulateModalListener, spentTimeNode };
}

export const congratulateModal = generateCongratulateModal();
