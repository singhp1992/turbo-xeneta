import React, { useState } from "react";

type InputProps = {
  data: unknown[] | null | undefined;
  id: string;
};

export function InputOptions(props: InputProps) {
  const { data, id } = props;
  const [origin, setOrigin] = useState<string>("");
  const [results, setResults] = useState<any>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setOrigin(inputValue);
    const filteredResults = data?.filter((item: any) =>
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
        value={origin}
        onChange={handleInputChange}
        placeholder={`Search ${id}...`}
      />
      <ul>
        {results?.map((item: any, index: any) => (
          <li
            key={index}
            className="px-2 py-1 border-b cursor-pointer text-neutral-500 hover:bg-slate-100 border-neutral-200"
            onClick={() => setOrigin(item.name + " (" + item.code + ")")}
          >
            {item.name} ({item.code})
          </li>
        ))}
      </ul>
    </div>
  );
}
