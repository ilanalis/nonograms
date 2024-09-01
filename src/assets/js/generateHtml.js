import { createElement } from "./createElement";
import bgImg from "../888420d0a723e99aaee3af2f4eb56772.jpg";
import volumeOffImg from "../volume-mute.png";
import iconSun from "../icon-sun.png";

export function generateHtml() {
  const wrapperNode = createElement("div", document.body, ["wrapper"]);
  // (function () { //todo:если получится перенести сюда назначение src изображения, раскомментировать
  const bgWrapperNode = createElement("div", document.body, [
    "wrapper-bg",
    "-bg",
  ]);
  const bgImgNode = createElement("img", bgWrapperNode, []);
  // bgImg.src = bgImg;
  // })();
  bgImgNode.src = bgImg; // todo: эта строчка должна быть в generateHtml, но из-за сборщика меняется вложенность файлов, происходит ошибка при импорте изображения

  const bgOverlay = createElement("div", bgWrapperNode, ["wrapper-overlay"]);
  const headerNode = createHeader(wrapperNode);
  const mainNode = createElement("main", wrapperNode, ["main"]);
  const statisticsNode = createElement("div", mainNode, [
    "main__statistics",
    "statistics",
  ]);
  const spentTimeNode = createSpentTimeBlock();
  const openScoreTableBtnNode = createElement("div", statisticsNode, [
    "statistics__open-score-table-btn",
    "text-block",
  ]);
  openScoreTableBtnNode.id = "open-score-table";
  const openScoreBtnText = createElement("span", openScoreTableBtnNode, []);
  const saveGameBtnNode = createElement("button", statisticsNode, ["statistic__save-game", "text-block"])
  const saveGameBtnText = createElement("span", saveGameBtnNode, []);
  saveGameBtnText.innerHTML = "save game";
  saveGameBtnNode.id = "save-game";
  const lastGameBtnNode = createElement("button", statisticsNode, ["statistic__last-game", "text-block"])
  lastGameBtnNode.id = "last-game";
  const lastGameBtnText = createElement("span", lastGameBtnNode, []);
  lastGameBtnText.innerHTML = "last game";
  const gameNode = createGameBlock(mainNode);
  const actionsBlock = createActionsBlock(mainNode);
  openScoreBtnText.innerHTML = "open score table";
  function createSpentTimeBlock() {
    const spentTimeBlock = createElement("div", statisticsNode, [
      "statistics__spent-time-block",
      "text-block",
      "text-block--non-clickable",
    ]);
    const span = createElement("span", spentTimeBlock, []);
    const spentTime = createElement("span", spentTimeBlock, []);
    span.innerHTML = "spent  time:";
    spentTime.innerHTML = "00:00:00";
    spentTimeBlock.id = "spent-time";
    return spentTime;
  }
  function createGameBlock() {
    const gameBlockNode = createElement("div", mainNode, [
      "main__game-block",
      "game-block",
    ]);
    const gameTitleBlockNode = createElement("div", gameBlockNode, [
      "game-block__title",
      "text-block",
      "text-block--non-clickable",
    ]);
    const gameTitleNode = createElement("span", gameTitleBlockNode, []);
    const gameFieldWrapper = createElement("div", gameBlockNode, [
      "game-block__field-wrapper",
    ]);
    const gameFieldNode = createElement("div", gameFieldWrapper, [
      "game-block__field",
      "field",
    ]);
    const fieldEmptyPart = createElement("div", gameFieldNode, [
      "field__empty-part",
    ]);
    const columnsCluesNode = createElement("div", gameFieldNode, [
      "field__columns-clues-block",
    ]);
    const rowsCluesNode = createElement("div", gameFieldNode, [
      "field__rows-clues-block",
    ]);
    const gameBoardNode = createElement("div", gameFieldNode, [
      "field__game-board",
    ]);

    gameTitleNode.innerHTML = "cat"; //todo: add title
    let mainScreenListener;
    return {
      gameTitleNode,
      gameFieldNode,
      columnsCluesNode,
      rowsCluesNode,
      gameBoardNode,
      mainScreenListener,
      spentTimeNode,
      ...headerNode,
      saveGameBtnNode
    };
  }
  function createActionsBlock(mainNode) {
    const actionsBlockNode = createElement("div", mainNode, [
      "main__actions-block",
      "actions-block",
    ]);
    const showSolutionBtnNode = createElement("div", actionsBlockNode, [
      "text-block",
    ]);
    const showSolutionBtnText = createElement("span", showSolutionBtnNode, []);
    const resetGameBtnNode = createElement("button", actionsBlockNode, [
      "text-block",
    ]);

    const resetGameBtnText = createElement("span", resetGameBtnNode, []);
    const newGameBtnNode = createElement("button", actionsBlockNode, [
      "text-block",
      "text-block--dark",
    ]);
    const newGameBtnText = createElement("span", newGameBtnNode, []);
    showSolutionBtnNode.id = "show-solution"
    showSolutionBtnText.innerHTML = "show solution";
    resetGameBtnText.innerHTML = "reset game";
    resetGameBtnNode.id = "reset-game";
    newGameBtnNode.id = "new-game";
    newGameBtnText.innerHTML = "new game";
    return {};
  }

  function createHeader(wrapper) {
    const headerNode = createElement("header", wrapper, ["header"]);
    const headerLogoNode = createElement("span", headerNode, ["header__logo"]);
    headerLogoNode.innerHTML = "NONOGRAMS";
    const settingsBlockNode = createElement("div", headerNode, ["header__settings"]);
    const btnWrapperChangeTheme = createElement("div", settingsBlockNode, ["header__btn-wrapper"]);
    const btnWrapperChangeSoundState = createElement("div", settingsBlockNode, ["header__btn-wrapper"]);
    const changeThemeBtnNode = createElement("button", btnWrapperChangeTheme, ["header__button", "-bg"]);
    changeThemeBtnNode.id = "turn-theme";
    const changeThemeImageNode = createElement("img", changeThemeBtnNode, []);
    changeThemeImageNode.src = iconSun;
    const headerSoundBtnNode = createElement("button", btnWrapperChangeSoundState, ["header__button", "-bg"]);
    const headerSoundImageNode = createElement("img", headerSoundBtnNode, []);
    headerSoundImageNode.src = volumeOffImg;
    headerSoundBtnNode.dataset.sound = "off";
    headerSoundBtnNode.id = "turn-sound";
    return {headerNode, headerSoundImageNode, changeThemeImageNode};
  }

  return { wrapperNode, bgImg, spentTimeNode, ...gameNode, ...actionsBlock };
}

export const mainNodes = generateHtml();
