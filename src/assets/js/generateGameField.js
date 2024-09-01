import { createElement } from "./createElement";
import { rabbitGame } from "./storage-games";

export function generateGameField(
  game,
  columnsCluesNode,
  rowsCluesNode,
  gameBoardNode,
  gameTitleNode
) {
  columnsCluesNode.innerHTML = "";
  rowsCluesNode.innerHTML = "";
  gameTitleNode.innerHTML = "";
  gameBoardNode.innerHTML = "";
  const maxLengthOfCLuesColumns = game.game.getMaxLengthOfCluesColumns();
  const maxLengthOfCLuesRows = game.game.getMaxLengthOfCluesRows();
  gameTitleNode.innerHTML = game.game.name;

  (function generateCluesColumns() {
    let currentColumnNum = 1;

    for (let i = 0; i < game.game.columnsCount; i += 1) {
      const cluesColumn = createElement("div", columnsCluesNode, [
        "field__column",
      ]);
      for (let y = 0; y < maxLengthOfCLuesColumns; y += 1) {
        const clueCell = createElement("div", cluesColumn, ["field__cell"]);
        if (currentColumnNum === 5) {
          clueCell.classList.add("field__cell--bold-right-border");
        }
      }
      if (currentColumnNum === 5) {
        currentColumnNum = 0;
      }
      currentColumnNum += 1;
    } // just add cells
    for (let i = 0; i < game.game.columnsCount; i += 1) {

      const cluesColumnCells = [...Array.from(
        columnsCluesNode.childNodes[i].childNodes
      )];
      const reversedCluesColumnCells = cluesColumnCells.reverse();
      const cluesColumns = [...game.game.cluesColumns[i]]
      const reversedCluesColumns =cluesColumns.reverse();
      for (let y = 0; y < maxLengthOfCLuesColumns; y += 1) {
        const cellValue =
          typeof reversedCluesColumns[y] === "undefined"
            ? ""
            : reversedCluesColumns[y];
        reversedCluesColumnCells[y].innerHTML = cellValue;
        if (reversedCluesColumnCells[y].innerHTML) {
          reversedCluesColumnCells[y].classList.add("field__cell--clickable");
        }
      } //fill cells with right clues
    }
  })();
  (function generateCluesRows() {
    let currentRowNum = 1;
    for (let i = 0; i < game.game.rowsCount; i += 1) {
      const cluesRow = createElement("div", rowsCluesNode, ["field__row"]);
      if (currentRowNum === 5) {
        cluesRow.classList.add("field__row--bold-bottom-border");
        currentRowNum = 0;
      }
      for (let y = 0; y < maxLengthOfCLuesRows; y += 1) {
        const clueCell = createElement("div", cluesRow, ["field__cell"]);
      }
      currentRowNum += 1;
    }
    for (let i = 0; i < game.game.rowsCount; i += 1) {
      const reversedCluesRowsCells = Array.from(
        rowsCluesNode.childNodes[i].childNodes
      ).reverse();
      const cluesRows = [...game.game.cluesRows[i]];
      const reversedCluesRows = cluesRows.reverse();
      for (let y = 0; y < maxLengthOfCLuesRows; y += 1) {
        const cellValue =
          typeof reversedCluesRows[y] === "undefined"
            ? ""
            : reversedCluesRows[y];
        reversedCluesRowsCells[y].innerHTML = cellValue;
        if (reversedCluesRowsCells[y].innerHTML) {
          reversedCluesRowsCells[y].classList.add("field__cell--clickable");
        }
      }
    }
  })();
  (function generateBoard() {
    let currentId = 0;
    let currentRowNum = 1;
    for (let i = 0; i < game.game.rowsCount; i += 1) {
      const boardRow = createElement("div", gameBoardNode, [
        "field__board-row",
      ]);
      if (currentRowNum === 5) {
        boardRow.classList.add("field__board-row--bold-bottom-border");
        currentRowNum = 0;
      }
      let currentCellNum = 1;
      for (let y = 0; y < game.game.columnsCount; y += 1) {
        const boardCell = createElement("div", boardRow, [
          "field__cell",
          "field__cell--clickable",
          "field__board-cell",
        ]);
        if (currentCellNum === 5) {
          boardCell.classList.add("field__cell--bold-right-border");
          currentCellNum = 0;
        }
        const crossedCell = createElement("div", boardCell, [
          "field__crossed-cell",
        ]);
        boardCell.id = currentId;
        boardCell.dataset.state = game.game.getStateOfCell(boardCell.id);
        currentId += 1;
        currentCellNum += 1;
      }
      currentRowNum += 1;
    }
  })();
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  function handTheChangingWidth(e) {
    const cells = document.querySelectorAll(".field__cell");

    if (e.matches) {
      cells.forEach((node) => {
        node.style.width = "21px";
        node.style.height = "21px";
      });
    } else {
      cells.forEach((node) => {
        node.style.width = "29px";
        node.style.height = "29px";
      });
    }
  }

  mediaQuery.addEventListener("change", (e) => handTheChangingWidth(e));
  handTheChangingWidth(mediaQuery);
}
