import { startNewGame } from "./startNewGame";
import { gamesArray } from "./storage-games";
import { chooseGameModalObject } from "./generateChooseGameModal";

export function openChooseGameModal(soundState) {
  const gamesListItemsNodes = Array.from(chooseGameModalObject.gamesListNode.children)
  gamesListItemsNodes.forEach((node) => {
    node.removeAttribute("data-game-state");
  });
  document.body.classList.add("-lock");
  chooseGameModalObject.modalNode.classList.remove("hidden");
  if (chooseGameModalObject.modalNodeListener) {
    chooseGameModalObject.modalNode.removeEventListener(
      "click",
      chooseGameModalObject.modalNodeListener
    );
  }
  let selectedGame = {game:null, gameBlockNode: null};

  chooseGameModalObject.modalNodeListener =
    chooseGameListenerWrapper(selectedGame, soundState);
  chooseGameModalObject.modalNode.addEventListener(
    "click",
    chooseGameModalObject.modalNodeListener
  );
}

function chooseGameListenerWrapper(selectedGame, soundState) {
  return function chooseGameListener(event) {
    const targetItem = event.target;
    if (targetItem.closest(".games-list__item")) {
      const gamesListItemsNodes = Array.from(chooseGameModalObject.gamesListNode.children)
      gamesListItemsNodes.forEach((node) => {
        node.removeAttribute("data-game-state");
      });
      if (!targetItem.classList.contains("games-list__item")) {
        selectedGame.gameBlockNode = targetItem.parentNode;
      } else {
        selectedGame.gameBlockNode = targetItem;
      }
      selectedGame.gameBlockNode.dataset.gameState = "active";
    }
    if(targetItem.closest("#random-game")){
      let randomNumber = Math.floor(Math.random() * gamesArray.length);
      selectedGame.game = gamesArray[randomNumber];
    }else{
    if (targetItem.closest(".games-list__item")) {
        selectedGame.game = gamesArray[selectedGame.gameBlockNode.id];
      }
    }
    if (targetItem.closest(".choose-game__start-btn")) {
      if (!selectedGame.game) {
        return;
      }
      document.body.classList.remove("-lock");
      chooseGameModalObject.modalNode.classList.add("hidden");
      startNewGame(selectedGame, soundState);
    }
  };
}
