import { MarketRate } from "./types";

// Check if every object has null values for all specified keys
export const checkAllNull = (objects: MarketRate[], keys: string[]): string => {
  const allNull = objects.every((obj) => {
    return keys.every((key) => obj[key] === null);
  });

  if (allNull) {
    return "Dataset is null - select a different origin/destination";
  } else {
    return "";
  }
};

export const capitalize = (str: string): string => {
  if (!str) return ""; // Handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
