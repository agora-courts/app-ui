const STATUS_TO_TIMESTAMP = {
  Inactive: "inactiveEndTime",
  "Awaiting Evidence": "submissionEndTime",
  Voting: "votingEndTime",
  "Finalizing Votes": "finalEndTime",
};

function getTimeUntilDate(timestamps, status) {
  if (status === "Completed") return "00d 00h 00m";

  let timestamp = STATUS_TO_TIMESTAMP[status];
  let targetDate = new Date(timestamps[timestamp]);
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();

  if (timeDiff < 0) {
    // Target date has already passed
    return "00d 00m 00s";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Pad single-digit numbers with leading zeros
  const formattedDays = String(days).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedDays}d ${formattedHours}h ${formattedMinutes}m`;
}

export default getTimeUntilDate;
