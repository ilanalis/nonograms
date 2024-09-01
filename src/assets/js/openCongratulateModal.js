import { openChooseGameModal } from "./openChooseGameModal";
import { gamesArray } from "./storage-games";
import { congratulateModal } from "./generateCongratulateModal";

export function openCongratulationModal(spentTimeObject, usersSettings) {
  document.body.classList.add("-lock");
  congratulateModal.modalNode.classList.remove("hidden");
  congratulateModal.spentTimeNode.innerHTML = `${spentTimeObject.timeInSeconds} seconds`;
  if (congratulateModal.congratulateModalListener) {
    congratulateModal.modalNode.removeEventListener(
      "click",
      congratulateModal.congratulateModalListener
    );
  }
  congratulateModal.congratulateModalListener = newGameListenerWrapper(usersSettings);
  congratulateModal.modalNode.addEventListener(
    "click",
    congratulateModal.congratulateModalListener
  );
}

function newGameListenerWrapper(usersSettings) {
  return function newGameListener(event) {
    if (event.target.closest(".congratulate-block__new-game-btn")) {
      openChooseGameModal(usersSettings);
      congratulateModal.modalNode.classList.add("hidden");
      document.body.classList.remove("-lock");
    }
  };
}
