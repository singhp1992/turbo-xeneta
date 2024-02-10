import { SetStateAction } from "react";
import { months } from "./constants";
import { MarketRate, PortData, RouteData, ObjectType, NullData } from "./types";

// Check if every object has null values for all specified keys
export const checkAllNull = (
  marketRate: MarketRate[],
  keys: string[],
  route: RouteData
): SetStateAction<NullData> => {
  const allNull = marketRate.every((obj) => {
    return keys.every((key) => obj[key] === null);
  });

  if (allNull) {
    return {
      isNull: true,
      message: `No dataset available between ${route.origin.name} and ${route.destination.name}`,
    };
  } else {
    return {
      isNull: false,
      message: `${route.origin.name} to ${route.destination.name}`,
    };
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
