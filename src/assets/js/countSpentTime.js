export function countSpentTime(spentTimeNode, spentTimeObject) {
  let hours = spentTimeObject.hours;
  let minutes = spentTimeObject.minutes;
  let seconds = spentTimeObject.seconds;

  let intervalId = setInterval(() => {
    seconds += 1;
    if (seconds > 59) {
      minutes += 1;
      seconds = 0;
    }
    if (minutes > 59) {
      hours += 1;
      minutes = 0;
    }
    spentTimeObject.time = `${validateTime(hours)}:${validateTime(
      minutes
    )}:${validateTime(seconds)}`;

    spentTimeNode.innerHTML = spentTimeObject.time;
    spentTimeObject.timeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    spentTimeObject.hours = hours;
    spentTimeObject.minutes =minutes;

    spentTimeObject.seconds = seconds;

  }, 1000);
  return intervalId;
}

function validateTime(unit) {
  return unit > 9 ? unit : `0${unit}`;
}
