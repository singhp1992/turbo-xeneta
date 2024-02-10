import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import { RouteData } from "../utils/types";

type SwitchProps = {
  route: RouteData;
  setRoute: Dispatch<SetStateAction<RouteData>>;
  originKey: keyof RouteData;
  destinationKey: keyof RouteData;
};

export const Switch = (props: SwitchProps): JSX.Element => {
  const { setRoute, route, originKey, destinationKey } = props;
  return (
    <div className="w-[24px]">
      <ArrowsRightLeftIcon
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
  );
};
