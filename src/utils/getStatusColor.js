const getStatusColor = (status) => {
  let color = "green.500";
  switch (status) {
    case "Inactive":
      color = "yellow.400";
      break;
    case "Awaiting Evidence":
      color = "cyan.500";
      break;
    case "Voting":
      color = "blue.500";
      break;
    case "Finalizing Votes":
      color = "purple.500";
      break;
  }

  return color;
};

export default getStatusColor;
