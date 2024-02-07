import { InputOptions } from "./InputOptions";
import { PortData } from "../types";

type SearchProps = {
  portArrays: PortData[] | null | undefined;
  origin: string;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  destination: string;
};

export function SearchPorts(props: SearchProps) {
  const { portArrays, origin, setOrigin, setDestination, destination } = props;

  return (
    <div className="flex">
      <InputOptions
        data={portArrays}
        id="origin"
        setValue={setOrigin}
        value={origin}
      />
      <InputOptions
        data={portArrays}
        id="destination"
        setValue={setDestination}
        value={destination}
      />
    </div>
  );
}
