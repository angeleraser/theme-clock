import { getDate, getSystemTheme, getTime, themes, timer } from "./utils.js";

const themeTogglerBtn = document.getElementById("theme-btn");
const secondsHand = document.querySelector('[data-clock-hand="seconds"]');
const hoursHand = document.querySelector('[data-clock-hand="hours"]');
const minutesHand = document.querySelector('[data-clock-hand="minutes"]');
const clockTime = document.getElementById("clock-time");
const clockDate = document.getElementById("clock-date");

function toggleAppTheme() {
  theme = theme === themes.dark ? themes.light : themes.dark;
  document.documentElement.setAttribute("data-theme", theme);
}

function setAngleRotation(el, angle) {
  el.style.transform = `rotate(${angle}deg) translateX(-50%)`;
}

function setClockTime({ hours = 0, minutes = 0, zone }) {
  clockTime.textContent = `
${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} 
${zone}`;
}

function setClockDate({ day, month, weekDay }) {
  clockDate.innerHTML = `
  ${weekDay}, ${month}
  <span class="clock-date-day">${day}</span>
  `;
}

function updateClock() {
  const { seconds, hours, minutes, zone } = getTime({ format: 12 });
  const { weekDay, day, month } = getDate();

  setAngleRotation(secondsHand, (seconds * CLOCK_ANGLE) / MAX_SECONDS);
  setAngleRotation(hoursHand, (hours * CLOCK_ANGLE) / MAX_HOURS);
  setAngleRotation(minutesHand, (minutes * CLOCK_ANGLE) / MAX_MINUTES);

  setClockTime({ hours, minutes, zone });
  setClockDate({ weekDay, month, day });
}

const CLOCK_ANGLE = 360;
const MAX_HOURS = 12;
const MAX_SECONDS = 60;
const MAX_MINUTES = 60;

let theme = getSystemTheme();

document.documentElement.setAttribute("data-theme", theme);
themeTogglerBtn.addEventListener("click", toggleAppTheme);

updateClock();
timer({
  durationMs: Infinity,
  intervalMs: 1000,
  callback: updateClock,
});
