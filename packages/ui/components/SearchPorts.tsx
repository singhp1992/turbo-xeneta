import { PortData, RouteData } from "../utils/types";
import { Switch } from "./Switch";
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

export const SearchPorts = (props: SearchProps) => {
  // defining the props
  const { portArrays, setRoute, route, originKey, destinationKey } = props;
  const removeDestinationFromOriginData = removeElementFromArrayOfObjects(
    route,
    portArrays,
    destinationKey
  );
  const removeOriginFromDestinationData = removeElementFromArrayOfObjects(
    route,
    portArrays,
    originKey
  );

  return (
    <div className="flex items-center justify-center mt-4 md:mt-0">
      {/* for setting origin */}
      <AutoInput
        label={originKey}
        value={route[originKey]}
        data={removeDestinationFromOriginData}
        setValue={setRoute}
      />
      {/* this allows the user to switch the origin and destination */}
      <Switch {...props} />
      {/* for setting destination */}
      <AutoInput
        label={destinationKey}
        value={route[destinationKey]}
        data={removeOriginFromDestinationData}
        setValue={setRoute}
      />
    </div>
  );
};
