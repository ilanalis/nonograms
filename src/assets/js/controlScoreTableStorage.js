export function controlScoreTableStorage(game, spentTimeObject){
  class Result{
    constructor(game, spentTime){
      this.name = game.name,
      this.difficulty = game.getDifficulty(),
      this.spentTime = spentTime.time,
      this.timeInSeconds = spentTime.timeInSeconds
    }
  }
  let resultsArray = JSON.parse(localStorage.getItem("results"));
  if(!resultsArray){
    resultsArray = []
  }
  resultsArray.push(new Result(game, spentTimeObject));
  localStorage.setItem("results", JSON.stringify(resultsArray));
  let bestResults = sort(resultsArray).slice(0,5)
  localStorage.setItem("bestResults", JSON.stringify(bestResults))
}

function sort(array){
  return array.sort( function( a , b){
    if(a.timeInSeconds > b.timeInSeconds) return 1;
    if(a.timeInSeconds < b.timeInSeconds) return -1;
    return 0;
});
}