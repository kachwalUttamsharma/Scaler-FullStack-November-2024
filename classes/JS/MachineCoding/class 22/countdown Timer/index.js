const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const continueBtn = document.getElementById("continue");
const resetBtn = document.getElementById("reset");
const minInput = document.getElementById("min");
const hrsInput = document.getElementById("hr");
const secInput = document.getElementById("sec");
let saveTimeLeft = 0;
let counterId;

startBtn.addEventListener("click", () => {
  // validations and we have transformation
  const mins = parseInt(minInput.value) || 0;
  const hrs = parseInt(hrsInput.value) || 0;
  const secs = parseInt(secInput.value) || 0;
  const result = validateInput(mins, hrs, secs);
  if (!result) {
    return;
  }
  const { transformedhrs, transformedmins, transformedSecs } = TransformedInput(
    mins,
    hrs,
    secs
  );
  const totalTimeInSeconds =
    transformedhrs * 60 * 60 + transformedmins * 60 + transformedSecs;
  timer(totalTimeInSeconds);
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
});

pauseBtn.addEventListener("click", () => {
  clearInterval(counterId);
  pauseBtn.style.display = "none";
  continueBtn.style.display = "block";
});

continueBtn.addEventListener("click", () => {
  timer(saveTimeLeft);
  continueBtn.style.display = "none";
  pauseBtn.style.display = "block";
});

resetBtn.addEventListener("click", () => {
  saveTimeLeft = 0;
  clearInterval(counterId);
  minInput.value = "00";
  hrsInput.value = "00";
  secInput.value = "00";
  continueBtn.style.display = "none";
  pauseBtn.style.display = "none";
  startBtn.style.display = "block";
  resetBtn.style.display = "block";
});

function timer(countDownTime) {
  counterId = setInterval(() => {
    updateUIEverySec(countDownTime);
    countDownTime--;
    saveTimeLeft = countDownTime;
  }, 1000);
}

function updateUIEverySec(countDownTime) {
  if (countDownTime === 0) {
    clearInterval(counterId);
    minInput.value = "00";
    hrsInput.value = "00";
    secInput.value = "00";
    continueBtn.style.display = "none";
    pauseBtn.style.display = "none";
    startBtn.style.display = "block";
    resetBtn.style.display = "block";
    return;
  }
  let hrs = Math.floor(countDownTime / 3600);
  let mins = Math.floor((countDownTime % 3600) / 60);
  let secs = countDownTime % 60;
  if (secs > 0) {
    secs--;
    secInput.value = secs < 10 ? `0${secs}` : `${secs}`;
    minInput.value = mins;
    hrsInput.value = hrs;
    return;
  }
  if (mins > 0) {
    mins--;
    minInput.value = mins < 10 ? `0${mins}` : `${mins}`;
    secInput.value = 59;
    hrsInput.value = hrs;
    return;
  }
  if (hrs > 0) {
    hrs--;
    minInput.value = 59;
    secInput.value = 59;
    hrsInput.value = hrs < 10 ? `0${hrs}` : `${hrs}`;
  }
}

function validateInput(mins, hrs, secs) {
  if (mins === 0 && hrs === 0 && secs == 0) {
    alert("please enter valid time");
    return false;
  }
  if (hrs > 24 || hrs < 0 || mins < 0 || secs < 0) {
    alert("negative / hrs > 24 not allowed");
    return false;
  }
  const { transformedSecs, transformedmins, transformedhrs } = TransformedInput(
    mins,
    hrs,
    secs
  );
  const totalTime =
    transformedhrs * 60 * 60 + transformedmins * 60 + transformedSecs;
  if (totalTime > 86400) {
    alert("total time should not be more than 24 hours");
    return false;
  }
  return true;
}

function TransformedInput(mins, hrs, secs) {
  if (secs >= 60) {
    mins++;
    secs = secs % 60;
    // secs = secs-60;
  }
  if (mins >= 60) {
    hrs++;
    mins = mins % 60;
  }
  return {
    transformedSecs: secs,
    transformedhrs: hrs,
    transformedmins: mins,
  };
}
