import { generateGameField } from "./generateGameField";
import { openCongratulationModal } from "./openCongratulateModal";
import { mainNodes } from "./generateHtml";
import { countSpentTime } from "./countSpentTime";
import { openChooseGameModal } from "./openChooseGameModal";
import volumeOnImg from "../volume.png";
import volumeOffImg from "../volume-mute.png";
import iconMoon from "../icon-moon.png";
import iconSun from "../icon-sun.png";

import { 
  crossTheCellSoundObject, 
  eraseTheCellSoundObject, 
  fillTheCellSoundObject, 
  winSoundObject 
} from "./storage";
import { gamesArray } from "./storage-games";
import { generateScoreTableModal } from "./generateScoreTableModal";
import { openScoreTableModal } from "./openScoreTableModal";
import { controlScoreTableStorage } from "./controlScoreTableStorage";

export function startNewGame(currentGame, usersSettings) {

  
  // const bestResults = JSON.parse(localStorage.getItem("bestResults"));

  
  
  gamesArray.forEach((game) => {
    for (let i = 0; i < game.usersBoard.length; i += 1) {
      for (let y = 0; y < game.usersBoard[i].length; y += 1) {
        game.usersBoard[i][y] = 0;
      }
    }
  });
  generateGameField(
    currentGame,
    mainNodes.columnsCluesNode,
    mainNodes.rowsCluesNode,
    mainNodes.gameBoardNode,
    mainNodes.gameTitleNode
  );
  let spentTimeObject = {
    time: "00:00:00",
    intervalId: 1,
    timeInSeconds: 0,
    isItFirstClick: true,
    hours:0,
    minutes:0,
    seconds:0
  };
  mainNodes.spentTimeNode.innerHTML = spentTimeObject.time;
  function startCountSpentTime() {
    spentTimeObject.intervalId = countSpentTime(
      mainNodes.spentTimeNode,
      spentTimeObject
    );
  }
  if (mainNodes.mainScreenListener) {
    document.body.removeEventListener("click", mainNodes.mainScreenListener);
    document.body.removeEventListener(
      "contextmenu",
      mainNodes.mainScreenListener
    );
  }
  mainNodes.mainScreenListener = gameListenerWrapper(
    currentGame,
    spentTimeObject,
    startCountSpentTime,
    usersSettings
  );
  document.body.addEventListener("click", mainNodes.mainScreenListener);
  document.body.addEventListener("contextmenu", mainNodes.mainScreenListener);

}

function gameListenerWrapper(
  currentGame,
  spentTimeObject,
  startCountSpentTime,
  usersSettings
) {
  return function listener(event) {
    const currentTarget = event.target;
   
    if (currentTarget.closest(".field__board-cell")) {
      fieldControl(
        event,
        currentTarget,
        currentGame,
        spentTimeObject,
        startCountSpentTime,
        usersSettings
      );
    }
    if (currentTarget.closest("#reset-game")) {
      resetGameBtnControl(currentGame, spentTimeObject, startCountSpentTime);
    }
    if(currentTarget.closest("#show-solution")){
      showSolutionBtnControl(currentGame,spentTimeObject);
    }
    if(currentTarget.closest("#new-game")){
       mainNodes.saveGameBtnNode.disabled = false;

      clearInterval(spentTimeObject.intervalId);
      openChooseGameModal(usersSettings);
    }
    if(currentTarget.closest("#save-game")){
      saveGameBtnControl(currentGame, spentTimeObject);
    }
    if(currentTarget.closest("#last-game")){
      lastGameBtnControl(spentTimeObject, startCountSpentTime, currentGame);
    };
    if(currentTarget.closest("#turn-sound")){
      soundControl(usersSettings);
    }
    if(currentTarget.closest("#turn-theme")){
      themeControl(usersSettings)
    }
    if(currentTarget.closest("#open-score-table")){
      openScoreTableModal()
    }
  };
}

function themeControl(usersSettings){
  usersSettings.themeState = !usersSettings.themeState;
  if(usersSettings.themeState){
    mainNodes.changeThemeImageNode.src = iconSun;
    document.body.classList.remove("dark-theme");
  }else{
    mainNodes.changeThemeImageNode.src = iconMoon;
    document.body.classList.add("dark-theme");
  }
}


function lastGameBtnControl(spentTimeObject, startCountSpentTime, currentGame){
  mainNodes.saveGameBtnNode.disabled = false;
  
  const savedGameObject = JSON.parse(localStorage.getItem("savedGame"));
  currentGame.game = gamesArray[savedGameObject.game];
  const savedGame={game:gamesArray[savedGameObject.game]};
  const savedGameBoard = savedGameObject.savedBoard;
  spentTimeObject.hours = +savedGameObject.spentHours;
  spentTimeObject.minutes = +savedGameObject.spentMinutes;
  spentTimeObject.seconds = +savedGameObject.spentSeconds;
  clearInterval(spentTimeObject.intervalId);
  spentTimeObject.isItFirstClick = false;
  startCountSpentTime(mainNodes.spentTimeNode, spentTimeObject);
  generateGameField(
    savedGame,
    mainNodes.columnsCluesNode,
    mainNodes.rowsCluesNode,
    mainNodes.gameBoardNode,
    mainNodes.gameTitleNode
  );
  for (let i = 0; i < savedGame.game.usersBoard.length; i += 1) {
    for (let y = 0; y < savedGame.game.usersBoard[i].length; y += 1) {
      Array.from(mainNodes.gameBoardNode.children).forEach((row) => {
        Array.from(row.children).forEach((cell) => {
          savedGame.game.usersBoard[i][y] = savedGameBoard[i][y];
          cell.dataset.state = savedGame.game.getStateOfCell(cell.id);
        });
      });
    }
  }
}

function saveGameBtnControl(currentGame, spentTimeObject){
  let boardCopy = [];
  for (let i = 0; i < currentGame.game.usersBoard.length; i += 1) {
    boardCopy[i]= [];
    for (let y = 0; y < currentGame.game.usersBoard[i].length; y += 1) {
      boardCopy[i][y] = currentGame.game.usersBoard[i][y];
    }
  }
  localStorage.setItem("savedGame", JSON.stringify({
    "game": gamesArray.indexOf(currentGame.game),
    "savedBoard":boardCopy,
    "spentHours": spentTimeObject.hours,
    "spentMinutes": spentTimeObject.minutes,
    "spentSeconds": spentTimeObject.seconds,
  }))
  
}

function soundControl(usersSettings){
  usersSettings.soundState = !usersSettings.soundState;
  if(usersSettings.soundState){
    mainNodes.headerSoundImageNode.src = volumeOnImg;
  }else{
    mainNodes.headerSoundImageNode.src = volumeOffImg;
  }
}

function showSolutionBtnControl(currentGame, spentTimeObject){
  mainNodes.saveGameBtnNode.disabled= true;
  for (let i = 0; i < currentGame.game.usersBoard.length; i += 1) {
    for (let y = 0; y < currentGame.game.usersBoard[i].length; y += 1) {
      Array.from(mainNodes.gameBoardNode.children).forEach((row) => {
        Array.from(row.children).forEach((cell) => {
          currentGame.game.usersBoard[i][y] = currentGame.game.solvedBoard[i][y];
          cell.dataset.state = currentGame.game.getStateOfCell(cell.id);
        });
      });
    }
  }
  Array.from(mainNodes.gameBoardNode.children).forEach((row) => {
    Array.from(row.children).forEach((cell) => {
      cell.classList.add("field__cell--disabled");
    });
  });

  clearInterval(spentTimeObject.intervalId);
}

function resetGameBtnControl(
  currentGame,
  spentTimeObject,
) {
  mainNodes.saveGameBtnNode.disabled= false;

  Array.from(mainNodes.gameBoardNode.children).forEach((row) => {
    Array.from(row.children).forEach((cell) => {
      cell.classList.remove("field__cell--disabled");
    });
  });
  spentTimeObject.time = "00:00:00";
  clearInterval(spentTimeObject.intervalId);
  spentTimeObject.isItFirstClick = true;
  mainNodes.spentTimeNode.innerHTML = spentTimeObject.time;
  for (let i = 0; i < currentGame.game.usersBoard.length; i += 1) {
    for (let y = 0; y < currentGame.game.usersBoard[i].length; y += 1) {
      currentGame.game.usersBoard[i][y] = 0;
      Array.from(mainNodes.gameBoardNode.children).forEach((row) => {
        Array.from(row.children).forEach((cell) => {
          cell.dataset.state = currentGame.game.getStateOfCell(cell.id);
        });
      });
    }
  }
}

function fieldControl(
  event,
  currentTarget,
  currentGame,
  spentTimeObject,
  startCountSpentTime,
  usersSettings
) {
  const currentSoundState = usersSettings.soundState;
  const currentState = currentTarget.parentNode.dataset.state;
  if (spentTimeObject.isItFirstClick) {
    spentTimeObject.hours = 0;
    spentTimeObject.minutes = 0;
    spentTimeObject.seconds = 0;
    clearInterval(spentTimeObject.intervalId);
    startCountSpentTime(mainNodes.spentTimeNode, spentTimeObject);
    spentTimeObject.isItFirstClick = false;
  }
  if (event.type === "click") {
    if (currentState === "0" || currentState === "2") {
      if(currentSoundState){
        fillTheCellSoundObject.play();
      }
      currentGame.game.fillInACell(currentTarget.parentNode.id, 1);
    } else {
      if(currentSoundState){
        eraseTheCellSoundObject.play();
      }
      currentGame.game.fillInACell(currentTarget.parentNode.id, 0);
    }
    currentTarget.parentNode.classList.remove("crossed");
  } else if (event.type === "contextmenu") {
    event.preventDefault();

    if (currentState === "2") {
      if(currentSoundState){
        eraseTheCellSoundObject.play();
      }

      currentGame.game.fillInACell(currentTarget.parentNode.id, 0);
      currentTarget.parentNode.classList.remove("crossed");
    } else {
      if(currentSoundState){
        crossTheCellSoundObject.play();
      }
      currentGame.game.fillInACell(currentTarget.parentNode.id, 2);
      currentTarget.parentNode.classList.add("crossed");
    }
  }

  currentTarget.parentNode.dataset.state = currentGame.game.getStateOfCell(
    event.target.parentNode.id
  );
  if (currentGame.game.checkWin()) {
    clearInterval(spentTimeObject.intervalId);
    controlScoreTableStorage(currentGame.game, spentTimeObject)
    Array.from(mainNodes.gameBoardNode.children).forEach((row) => {
      Array.from(row.children).forEach((cell) => {
        cell.classList.add("field__cell--disabled");
      });
    });
    if(currentSoundState){
      winSoundObject.play();
    }
    setTimeout(() => openCongratulationModal(spentTimeObject, usersSettings), 1000);
  }
}
