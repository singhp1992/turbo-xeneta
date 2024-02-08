import { MarketRate } from "./types";

// Check if every object has null values for all specified keys
export const checkAllNull = (objects: MarketRate[], keys: string[]) => {
  const allNull = objects.every((obj) => {
    return keys.every((key) => obj[key] === null);
  });

  if (allNull) {
    return "Dataset is null - select a different origin/destination";
  } else {
    return "";
  }
};
