import { months } from "./constants";
import { MarketRate, PortData, RouteData, ObjectType } from "./types";

// Check if every object has null values for all specified keys
export const checkNullDatasets = (
  marketRate: MarketRate[],
  keys: string[],
  route: RouteData
): string => {
  const allNull = marketRate!.every((obj) => {
    return keys.every((key) => obj[key] === null);
  });

  if (allNull) {
    return `No dataset available between ${route.origin.name} and ${route.destination.name}`;
  } else {
    return `${route.origin.name} to ${route.destination.name}`;
  }
};

const isEqual = (objA: ObjectType, objB: ObjectType): boolean => {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};

// issue: getting an error if user inputs the same location for both the origin and the destination
// solution: removing the location from the dropdown if it's already selected (in either the origin or the destination dropdown)
export const removeElementFromArrayOfObjects = (
  route: RouteData,
  portArray: PortData[],
  removeFrom: keyof RouteData
): PortData[] => {
  return portArray.filter((obj: PortData) => !isEqual(obj, route[removeFrom]));
};

// formating the date so it's slightly more user friendly
export const formatDate = (inputDate: string): string => {
  const [year, month, day] = inputDate.split("-");
  const monthIndex: number = parseInt(month, 10) - 1;

  return `${months[monthIndex]} ${parseInt(day, 10)} '${year.slice(-2)}`;
};
