import { Dispatch, SetStateAction } from "react";
import { PortData, RouteData } from "../utils/types";
import { SearchPorts } from "./SearchPorts";

type HeaderProps = {
  appColor: string;
  appName: string;
  portData: PortData[];
  route: RouteData;
  setRoute: Dispatch<SetStateAction<RouteData>>;
};

export const Header = (props: HeaderProps): JSX.Element => {
  const { appColor, appName, portData, route, setRoute } = props;
  return (
    <div className={`shadow-sm`} style={{ backgroundColor: appColor }}>
      <div className="flex items-center justify-between max-w-screen-xl py-6 mx-auto">
        <p className="py-1 text-xl text-center text-white">{appName}</p>
        <SearchPorts
          portArrays={portData}
          route={route}
          setRoute={setRoute}
          originKey="origin"
          destinationKey="destination"
        />
      </div>
    </div>
  );
};
