// Check if every object has null values for all specified keys

export const checkAllNull = (objects: [], keys: string[]) => {
  const allNull = objects.every((obj) => {
    return keys.every((key) => obj[key] === null);
  });

  if (allNull) {
    return "Dataset is null - select a different origin/destination";
  } else {
    return "";
  }
};
