import { createElement } from "./createElement";
import { gamesArray } from "./storage-games";

export function generateChooseGameModal() {
  const modalNode = createElement("div", document.body, ["modal", "hidden"]);
  const modalContentBlockNode = createElement("div", modalNode, [
    "modal__content-block",
    "choose-game",
  ]);
  const modalTitle = createElement("span", modalContentBlockNode, [
    "modal__title",
  ]);
  modalTitle.innerHTML = "Choose Picture!";

  const gamesListWrapper = createElement("div", modalContentBlockNode, [
    "choose-game__games-wrapper",
  ]);
  const gamesListNode = createElement("div", gamesListWrapper, [
    "choose-game__games-list",
    "choose-game__games-list--active",
    "games-list",
  ]);
  const randomGameBlockNode = createElement("div", gamesListNode, ["games-list__item","games-list__item--text-center" ]);
  randomGameBlockNode.id = "random-game";
  const gameTitle = createElement("span", randomGameBlockNode, [
    "games-list__title",
  ]);
  gameTitle.innerHTML = "RANDOM GAME";
  for (let i = 0; i < gamesArray.length; i += 1) {
    const gameBlockNode = createElement("div", gamesListNode, [
      "games-list__item",
    ]);
    gameBlockNode.id = i;
    const gameTitle = createElement("span", gameBlockNode, [
      "games-list__title",
    ]);
    gameTitle.innerHTML = gamesArray[i].name;
    const gameDifficulty = createElement("span", gameBlockNode, [
      "games-list__description",
    ]);
    gameDifficulty.innerHTML = gamesArray[i].getDifficulty();
  }

  const startGameBtn = createElement("div", modalContentBlockNode, [
    "choose-game__start-btn","modal__button"
  ]);
  const startGameBtnText = createElement("span", startGameBtn, []);
  startGameBtnText.innerHTML = "start game";
  let modalNodeListener;
  return { modalNode, modalNodeListener, gamesListNode };
}

export const chooseGameModalObject = generateChooseGameModal();
