import "./styles.scss";
import { gamesArray } from "./assets/js/storage-games";
import { startNewGame } from "./assets/js/startNewGame";

function init() {
  const usersSettings = {SoundState: false, themeState: true};
  const currentGame = {game: gamesArray[0]}
  startNewGame(currentGame, usersSettings);

}

init();
