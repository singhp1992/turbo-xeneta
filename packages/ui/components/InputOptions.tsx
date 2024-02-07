import React, { useState } from "react";
import { PortData } from "../types";

type InputProps = {
  data: PortData[] | null | undefined;
  id: string;
  setValue: (origin: string) => void;
  value: string;
};

export function InputOptions(props: InputProps) {
  const { data, id, setValue, value } = props;
  const [results, setResults] = useState<any>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    const filteredResults = data?.filter((item: PortData) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="mx-4">
      <input
        id={id}
        type="text"
        className="w-full px-2 py-1 border rounded-md cursor-pointer border-neutral-200 placeholder:text-neutral-500"
        value={value}
        onChange={handleInputChange}
        placeholder={`Search ${id}...`}
      />
      <ul>
        {results?.map((item: any, index: any) => (
          <li
            key={index}
            className="px-2 py-1 border-b cursor-pointer text-neutral-500 hover:bg-slate-100 border-neutral-200"
            onClick={() => {
              setValue(item.name + " (" + item.code + ")");
              setResults(null);
            }}
          >
            {item.name} ({item.code})
          </li>
        ))}
      </ul>
    </div>
  );
}
