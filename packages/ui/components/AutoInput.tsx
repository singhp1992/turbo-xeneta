import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { PortData, RouteData } from "../utils/types";
import { capitalize } from "../utils/helpers";

type InputProps = {
  data?: PortData[];
  label: string; // "origin" or "destination" - representing the key in the RouteData object
  setValue?: Dispatch<SetStateAction<RouteData>>;
  value?: any;
};

export function AutoInput(props: InputProps) {
  const { data, label, setValue, value } = props;
  const options = [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ];
  return (
    <div className="mx-4 ">
      <Autocomplete
        id="input-autocomplete"
        sx={{
          width: 250,
          backgroundColor: "white",
          borderRadius: "4px",
          border: "none",
          fontColor: "black",
        }}
        size="small"
        // value={{ label: "The Godfather", id: 1 }}
        options={options}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} placeholder={`Search ${label} port`} />
        )}
      />
    </div>
  );
}
