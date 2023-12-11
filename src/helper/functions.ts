export const areBlankInputs = (inputs: string[]) => {
  return !inputs.every((input) => input !== '');
};
