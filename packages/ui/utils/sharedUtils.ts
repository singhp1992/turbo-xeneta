// Check if every object has null values for all specified keys
export const checkAllNull = (objects: [], keys: string[]) => {
  const allNull = objects.every((obj) => {
    return keys.every((key) => obj[key] === null);
  });

  if (allNull) {
    console.log("all the key values pairs are null");
  } else {
    console.log("NOT all the key values pairs are null");
  }
};
