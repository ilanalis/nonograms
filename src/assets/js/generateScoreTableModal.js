import { createElement } from "./createElement";

export function generateScoreTableModal(bestResults = [] ){
  const modalNode = createElement("div", document.body, ["modal", "modal__score-table", "hidden"]);
  const modalContentBlockNode = createElement("div", modalNode, [
    "modal__content-block",
    "score-table",
  ]);
  const modalTitle = createElement("span", modalContentBlockNode, [
    "modal__title",
  ]);
  modalTitle.innerHTML = "Score Table";
  const resultsListWrapper = createElement("div", modalContentBlockNode, [
    "score-table__results-listWrapper",
  ]);
  const resultsListNode = createElement("div", resultsListWrapper, [
    "score-table__results-list", "games-list",
  ]);

  
  const closeModalBtnNode = createElement("div", modalContentBlockNode, [
    "score-table__close-btn", "modal__button"
  ]);
  closeModalBtnNode.id = "close-table-score";
  const closeModalBtnText = createElement("span", closeModalBtnNode, []);
  closeModalBtnText.innerHTML = "close";
  let modalListener;
  return  {modalListener, modalNode, closeModalBtnNode, resultsListNode}
}

export const scoreTableModalObject = generateScoreTableModal()