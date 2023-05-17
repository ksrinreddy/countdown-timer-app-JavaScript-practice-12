// months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveAway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");
// console.log(items);

// setting initial, fixed giveaway time
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// setting give away info dynamically
// let futureDate = new Date(2022, 8, 16, 23, 10, 0);
let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 23, 5, 0);
// some bug in showing single digit minutes as 0 prefixed double digit minutes, need to solve. ex. 5 min to be shown as 05 min in giveaway sentence.

// access details from futureDate
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

let month = futureDate.getMonth();
// console.log(months[month]);
month = months[month];
const weekday = weekdays[futureDate.getDay()];
// console.log(weekday);

giveAway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes} hrs`;

// future time in milliseconds
const futureTime = futureDate.getTime();
// console.log(futureTime);

function getRemainingTime() {
  // values in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  const today = new Date().getTime();
  const t = futureTime - today;
  //   console.log(t);
  let days = Math.floor(t / oneDay);
  //   console.log(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  let values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  // if deadline expires
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, giveaway has expired!</h4>`;
  }
}
// countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
