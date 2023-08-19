// Return a string indicating the true status of a dispute
const getDisputeStatus = (timestamps, status) => {
  if (!timestamps) return;

  const statusAfterTimestamp = {
    "Awaiting Evidence": new Date(timestamps.inactiveEndTime),
    "Voting": new Date(timestamps.submissionEndTime),
    "Finalizing Votes": new Date(timestamps.votingEndTime),
  };
  const dateNow = new Date();

  if (
    new Date(timestamps.finalEndTime) < dateNow ||
    (status === "Inactive" && new Date(timestamps.inactiveEndTime) < dateNow) // this isn't fully sufficient - if no one votes / reveals should also complete
  )
    return "Completed";

  let flooredStatus = "Inactive";
  for (let [key, val] of Object.entries(statusAfterTimestamp)) {
    if (dateNow < val) break;

    flooredStatus = key;
  }

  switch (status) {
    case "Inactive":
      return flooredStatus;
    case "Awaiting Evidence":
      if (flooredStatus !== "Inactive") {
        return flooredStatus;
      } else {
        return status;
      }
    case "Voting":
      if (flooredStatus !== "Inactive" && flooredStatus !== "Awaiting Evidence") {
        return flooredStatus;
      } else {
        return status;
      }
    case "Finalizing Votes":
      return status;
    case "Completed":
      return status;
  }

  return flooredStatus;
};

export default getDisputeStatus;
