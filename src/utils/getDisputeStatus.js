// Return a string indicating the true status of a dispute
const getDisputeStatus = (timestamps, status) => {
  if (!timestamps) return;

  const statusAfterTimestamp = {
    "Awaiting Evidence": new Date(timestamps.inactiveEndTime),
    Voting: new Date(timestamps.submissionEndTime),
    "Finalizing Votes": new Date(timestamps.votingEndTime),
  };
  const dateNow = new Date();

  if (
    new Date(timestamps.finalEndTime) < dateNow ||
    (status === "Inactive" && new Date(timestamps.inactiveEndTime) < dateNow)
  )
    return "Complete";

  let flooredStatus = "Inactive";
  for (let [key, val] of Object.entries(statusAfterTimestamp)) {
    if (dateNow < val) break;

    flooredStatus = key;
  }

  return flooredStatus;
};

export default getDisputeStatus;
