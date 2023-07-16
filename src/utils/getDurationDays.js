const getDurationDays = (timestamps) => {
  if (!timestamps) return;
  const diffTime = Math.abs(
    new Date(timestamps["finalEndTime"]) - new Date(timestamps["startTime"])
  );

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + " days";
};

export default getDurationDays;
