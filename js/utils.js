export const themes = {
  dark: "dark",
  light: "light",
};

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? themes.light
    : themes.dark;
}

export function timer({ durationMs, callback, intervalMs = 100 }) {
  let totalMs = 0;

  const interval = setInterval(() => {
    totalMs += intervalMs;
    callback?.();
    if (totalMs >= durationMs) {
      clearInterval(interval);
    }
  }, intervalMs);
}

export function getTime({ format } = { format: 12 }) {
  const date = new Date();
  let hours = date.getHours();
  let zone = hours > 11 ? "PM" : "AM";

  if (format === 12 && hours > 11) {
    hours -= 12;
    zone = "PM";
  }

  if (hours === 0 && format === 12) {
    hours = 1;
    zone = "AM";
  }

  return {
    hours,
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    zone,
  };
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export function getDate() {
  const date = new Date();
  return {
    month: months[date.getMonth()],
    day: date.getDate(),
    weekDay: weekDays[date.getDay() - 1],
  };
}
