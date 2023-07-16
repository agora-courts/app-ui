const getLevel = (numTokens, levels) => {
  if (!numTokens || !levels) return 0;

  let nearestIndex = -1;
  let nearestDifference = Infinity;

  for (let i = 0; i < levels.length; i++) {
    const difference = numTokens - levels[i];
    if (difference < 0) return nearestIndex;

    if (difference < nearestDifference) {
      nearestDifference = difference;
      nearestIndex = i;
    }
  }
  return nearestIndex;
};

export default getLevel;
