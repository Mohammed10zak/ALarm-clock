var alarmString = null;
const alarmAudio = document.getElementById("alarm-audio");
const createAlarm = document.querySelector(".new-alarm");
const activeAlarm = document.getElementById("active-alarm");
const clearAlarm = document.getElementById("reset-alarm");
const alarmTextContainer = document.getElementById("alarm-text");
var currentTime = document.getElementById("curr-time");


const alarmText = (time) => `Alarm set at time ${time}`;

//  convert time to string value
const getTime = ({ hour, minute, second, period }) => {
  if (minute / 10 < 1) {
    minute = "0" + minute;
  }
  if (second / 10 < 1) {
    second = "0" + second;
  }
  return `${hour}:${minute}:${second} ${period}`;
};

//display the local time on screen
const renderClock = () => {
  const currentDate = new Date();
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();
  var period = hour >= 12 ? "PM" : "AM";
  if (hour > 12) {
    hour = hour % 12;
  }
  const time = getTime({ hour, minute, second, period });
  checkAlarm(time);
  currentTime.innerHTML = time;
};

//update time every second
setInterval(renderClock, 1000);

//Initialize alarm sound
alarmAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
alarmAudio.load();

// check if alarm needs to be triggered
const checkAlarm = (timeString) => {
  if (alarmString === timeString) {
    alarmAudio.play();
  }
};


// Handle Create Alarm button
const handleAlarm = (e) => {
  e.preventDefault();
  const { hour, sec, min, period } = document.forms[0];
  alarmString = getTime({
    hour: hour.value,
    second: sec.value,
    minute: min.value,
    period: period.value
  });
  // Reset form after submit
  document.forms[0].reset();

  createAlarm.style.display = "none";
  activeAlarm.style.display = "block";
  alarmTextContainer.innerHTML = alarmText(alarmString);
};

// handle clear button
const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
};

clearAlarm.addEventListener("click", handleClear);
document.forms[0].addEventListener("submit", handleAlarm);
