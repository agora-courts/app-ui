import idl from "../data/agora_court.json" assert { type: "json" };

const getError = (errorMessage) => {
  if (errorMessage.includes("Error Message: ")) {
    // known error
    return errorMessage.split("Error Message: ")[1];
  } else if (errorMessage.includes("0x")) {
    // raw error
    let hexCode = errorMessage.split("0x")[1];
    let binaryCode = parseInt(hexCode, 16);
    if (binaryCode > 6000) {
      for (let error of idl.errors) {
        if (error.code === binaryCode) {
          return error.msg;
        }
      }
    } else {
      if (binaryCode === 0) {
        return "This action can only be performed once";
      }
    }
  }

  // unknown error
  return errorMessage;
};

export default getError;
