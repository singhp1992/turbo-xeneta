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
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<PortData[] | null>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
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
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Search ${id}...`}
      />
      <ul className="z-[99] max-h-0 shadow-lg">
        {results?.map((item: any, index: any) => (
          <li
            key={index}
            className="z-10 px-2 py-1 bg-white border-b cursor-pointer text-neutral-500 hover:bg-neutral-100 border-neutral-200"
            onClick={() => {
              setInputValue(item.name + " (" + item.code + ")");
              setValue(item.code);
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
