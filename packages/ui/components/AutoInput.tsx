import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { PortData, RouteData } from "../utils/types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type InputProps = {
  data: PortData[];
  label: keyof RouteData; // "origin" or "destination" - representing the key in the RouteData object
  setValue: Dispatch<SetStateAction<RouteData>>;
  value: PortData | null;
};

export const AutoInput = (props: InputProps) => {
  const { data, label, setValue, value } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (newValue: PortData | null) => {
    setValue((prevState: RouteData) => ({
      ...prevState,
      [label]: newValue
        ? { name: newValue.name, code: newValue.code }
        : { name: "", code: "" },
    }));
  };

  return (
    <div>
      <Autocomplete
        id="input-autocomplete"
        fullWidth
        sx={{
          width: isMobile ? 150 : 200,
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
        renderInput={(params) => (
          <TextField {...params} placeholder={`Search ${label}`} />
        )}
      />
    </div>
  );
};
