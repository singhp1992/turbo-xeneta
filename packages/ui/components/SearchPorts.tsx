import { InputOptions } from "./InputOptions";
import { PortData, RouteData } from "../types";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

type SearchProps = {
  portArrays: PortData[];
  route: RouteData;
  setRoute: Dispatch<SetStateAction<RouteData>>;
};

export function SearchPorts(props: SearchProps) {
  const { portArrays, setRoute, route } = props;
  const origin = "origin";
  const destination = "destination";

  return (
    <div className="flex items-center">
      <InputOptions
        data={portArrays}
        id={origin}
        setValue={setRoute}
        value={route[origin]}
      />
      {/* this allows the user to switch the origin and destination */}
      <div className="w-[24px]">
        <ArrowsRightLeftIcon
          color="rgb(115 115 115)"
          height={24}
          onClick={() => {
            setRoute(() => {
              return {
                origin: route[destination],
                destination: route[origin],
              };
            });
          }}
          className="transition-transform duration-300 ease-in-out cursor-pointer hover:transform hover:scale-110"
        />
      </div>
      {/* destination input field, the ID is unique to the  */}
      <InputOptions
        data={portArrays}
        id={destination}
        setValue={setRoute}
        value={route[destination]}
      />
    </div>
  );
}
