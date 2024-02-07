import React, { useState } from "react";
import { InputOptions } from "./InputOptions";

type SearchProps = {
  portArrays: unknown[] | null | undefined;
  origin: string;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
};

export function SearchPorts(props: SearchProps) {
  const { portArrays, origin, setOrigin, setDestination } = props;

  return (
    <div className="flex">
      <InputOptions data={portArrays} id="origin" />
      <InputOptions data={portArrays} id="destination" />
    </div>
  );
}
