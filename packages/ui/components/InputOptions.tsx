import React, { Dispatch, Key, SetStateAction, useState } from "react";
import { PortData, RouteData } from "../types";

type InputProps = {
  data: PortData[];
  id: string;
  setValue: Dispatch<SetStateAction<RouteData>>;
};

export function InputOptions(props: InputProps) {
  const { data, id, setValue } = props;
  // the input value is unique to the input field
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

  const handleOptionClick = (selectedValue: PortData) => {
    setInputValue(`${selectedValue.name} (${selectedValue.code})`);
    setValue((prevState: RouteData) => ({
      ...prevState,
      [id]: {
        name: selectedValue.name,
        code: selectedValue.code,
      },
    }));
    setResults([]);
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
      <ul className="z-[99] h-0 shadow-lg">
        {results?.map((item: PortData, index: Key) => (
          <li
            key={index}
            className="z-10 px-2 py-1 bg-white border-b cursor-pointer text-neutral-500 hover:bg-neutral-100 border-neutral-200"
            onClick={() => handleOptionClick(item)}
          >
            {item.name} ({item.code})
          </li>
        ))}
      </ul>
    </div>
  );
}
