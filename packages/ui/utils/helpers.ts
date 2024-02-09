import { MarketRate, PortData, RouteData, ObjectType } from "./types";

// Check if every object has null values for all specified keys
export const checkAllNull = (
  objects: MarketRate[],
  keys: string[],
  route: RouteData
): string => {
  const allNull = objects.every((obj) => {
    return keys.every((key) => obj[key] === null);
  });

  if (allNull) {
    return `No dataset available between ${route.origin.name} and ${route.destination.name}`;
  } else {
    return `${route.origin.name} to ${route.destination.name}`;
  }
};

const isEqual = (objA: ObjectType, objB: ObjectType): boolean => {
  console.log(objA, objB, "objA, objB");
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
