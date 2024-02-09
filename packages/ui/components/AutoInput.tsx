import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { PortData, RouteData } from "../utils/types";

type InputProps = {
  data: PortData[];
  label: keyof RouteData; // "origin" or "destination" - representing the key in the RouteData object
  setValue: Dispatch<SetStateAction<RouteData>>;
  value: PortData | null;
  route: RouteData;
};

export function AutoInput(props: InputProps) {
  const { data, label, setValue, value, route } = props;

  const handleChange = (newValue: PortData | null) => {
    setValue((prevState: RouteData) => ({
      ...prevState,
      [label]: newValue
        ? { name: newValue.name, code: newValue.code }
        : { name: "", code: "" },
    }));
  };

  return (
    <div className="mx-4">
      <Autocomplete
        id="input-autocomplete"
        sx={{
          width: 250,
          backgroundColor: "white",
          borderRadius: "4px",
          border: "none",
          fontColor: "black",
        }}
        value={value?.code && value?.name ? value : null}
        onChange={(_e, value) => handleChange(value)}
        size="small"
        options={data}
        getOptionLabel={(option: PortData) => `${option.name} ${option.code}`}
        isOptionEqualToValue={(option: PortData, value: PortData | null) => {
          if (!value) {
            return !option || (option.name === "" && option.code === ""); // If value is null, only match when option is also null or empty
          }
          return (
            option && option.code === value.code && option.name === value.name
          );
        }}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} placeholder={`Search ${label}`} />
        )}
      />
    </div>
  );
}
