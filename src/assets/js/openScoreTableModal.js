import { createElement } from "./createElement";
import { generateScoreTableModal, scoreTableModalObject } from "./generateScoreTableModal";
export function openScoreTableModal(){
  scoreTableModalObject.resultsListNode.innerHTML = "";
  const bestResults = JSON.parse(localStorage.getItem("bestResults"));
  if(bestResults){
    for(let i = 0; i < bestResults.length; i += 1) {
      const resultBlockNode = createElement("div", scoreTableModalObject.resultsListNode, [
        "score-table__item", "games-list__item"
      ]);
      const resultTitle = createElement("span", resultBlockNode, [
        "score-table__title",
      ]);
      resultTitle.innerHTML = bestResults[i].name;
      const resultDifficulty = createElement("span", resultBlockNode, [
        "score-table__description",
      ]);
      resultDifficulty.innerHTML = bestResults[i].difficulty;
      const resultSpentTime = createElement("span", resultBlockNode, [
        "score-table__description",
      ]);
      resultSpentTime.innerHTML = bestResults[i].spentTime;
    }
  }
  document.body.classList.add("-lock");
  scoreTableModalObject.modalNode.classList.remove("hidden");
  if (scoreTableModalObject.modalListener) {
    scoreTableModalObject.closeModalBtnNode.removeEventListener(
      "click",
      scoreTableModalObject.modalListener
    );
  }
  scoreTableModalObject.modalListener =
  scoreTableListenerWrapper();
  scoreTableModalObject.closeModalBtnNode.addEventListener(
    "click",
    scoreTableModalObject.modalListener
  );
}
function scoreTableListenerWrapper(){
  return function scoreTableListener(event){
    document.body.classList.remove("-lock");
    scoreTableModalObject.modalNode.classList.add("hidden");
  }
}