import { PortData, RouteData } from "../utils/types";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import { AutoInput } from "./AutoInput";
import { removeElementFromArrayOfObjects } from "../utils/helpers";

type SearchProps = {
  portArrays: PortData[]; // PortData array of objects representing available ports
  route: RouteData; // this is the current route data object containing origin and destination
  setRoute: Dispatch<SetStateAction<RouteData>>; // fcn to update the route state
  originKey: keyof RouteData; // "origin" or "destination" - representing the key in the RouteData object
  destinationKey: keyof RouteData; // "origin" or "destination" - representing the key in the RouteData object
};

export function SearchPorts(props: SearchProps) {
  // defining the props
  const { portArrays, setRoute, route, originKey, destinationKey } = props;
  // Constants representing the key in the RouteData object
  // const destination: keyof RouteData = "destination";

  return (
    <div className="flex items-center">
      <AutoInput
        label={originKey}
        value={route[originKey]}
        data={removeElementFromArrayOfObjects(
          route,
          portArrays,
          destinationKey
        )}
        setValue={setRoute}
        route={route}
      />
      {/* this allows the user to switch the origin and destination */}
      <div className="w-[24px]">
        <ArrowsRightLeftIcon
          // color="rgb(115 115 115)"
          color="white"
          height={24}
          onClick={() => {
            //  fcn to switch origin and destination and update the route state
            setRoute(() => {
              return {
                origin: route[destinationKey],
                destination: route[originKey],
              };
            });
          }}
          className="transition-transform duration-300 ease-in-out cursor-pointer hover:transform hover:scale-110"
        />
      </div>
      {/* destination input field, the ID is unique to the  */}
      <AutoInput
        label={destinationKey}
        value={route[destinationKey]}
        data={removeElementFromArrayOfObjects(route, portArrays, originKey)}
        setValue={setRoute}
        route={route}
      />
    </div>
  );
}
