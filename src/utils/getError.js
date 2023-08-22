import idl from "../data/agora_court.json" assert { type: "json" };

const getError = (errorMessage) => {
  if (errorMessage.includes("Error Message: ")) {
    // known error
    return errorMessage.split("Error Message: ")[1];
  } else if (errorMessage.includes("0x")) {
    // raw error
    let hexCode = errorMessage.split("0x")[1];
    let binaryCode = parseInt(hexCode, 16);
    for (let error of idl.errors) {
      if (error.code === binaryCode) {
        return error.msg;
      }
    }
  }
  
  // unknown error
  return errorMessage;
};

export default getError;
