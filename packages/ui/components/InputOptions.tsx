import React, {
  Dispatch,
  Key,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { PortData, RouteData } from "../types";

type InputProps = {
  data: PortData[];
  id: string; // "origin" or "destination" - representing the key in the RouteData object
  setValue: Dispatch<SetStateAction<RouteData>>;
  value: any;
};

export function InputOptions(props: InputProps) {
  const { data, id, setValue, value } = props;
  // the input value is unique to the input field
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<PortData[] | null>();

  // update the input value state when the value prop changes (for example if origin/destination have been switched)
  useEffect(() => {
    if (value.name && value.code) {
      setInputValue(`${value.name} (${value.code})`);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value; // get input value from event
    setInputValue(inputValue); // update input value state

    // filter available results based on input value
    const filteredResults = data?.filter((item: PortData) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setResults(filteredResults); // update results state
  };

  // handle the click event on the available results
  const handleOptionClick = (selectedValue: PortData) => {
    setInputValue(`${selectedValue.name} (${selectedValue.code})`); // update input value state
    // update the route state based on the selected value - using the id to identify the key in the RouteData object
    setValue((prevState: RouteData) => ({
      ...prevState,
      [id]: {
        name: selectedValue.name,
        code: selectedValue.code,
      },
    }));
    setResults([]); // clear the results
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
      {/* display the available results to choose from */}
      <ul className="z-[99] h-0 shadow-lg">
        {results?.map((item: PortData, index: Key) => (
          <li
            key={index}
            className="z-10 px-2 py-1 bg-white border-b cursor-pointer text-neutral-500 border-neutral-200"
            onClick={() => handleOptionClick(item)}
          >
            {item.name} ({item.code})
          </li>
        ))}
      </ul>
    </div>
  );
}
