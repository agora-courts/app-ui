const relativeTimePeriods = [
  [31536000, "year"],
  [2419200, "month"],
  [604800, "week"],
  [86400, "day"],
  [3600, "hour"],
  [60, "minute"],
  [1, "second"],
];

function relativeTime(date) {
  if (!(date instanceof Date)) date = new Date(date);
  const seconds = (new Date() - date) / 1000;
  for (let [secondsPer, name] of relativeTimePeriods) {
    if (seconds >= secondsPer) {
      const amount = Math.floor(seconds / secondsPer);
      return `${amount} ${name}${amount != 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

export default relativeTime;
