import React, { useContext, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function ComboBox() {
  const { store } = useContext(Context);
  const [starWarsFilms, setStarWarsFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.characterscards) {
      const character = store.characterscards.map((character) => ({
        label: character.name,
        url: `/characterdetails/${character.uid}`,
      }));
      setStarWarsFilms(character);
    }
  }, [store.characterscards]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={starWarsFilms}
      getOptionLabel={(option) => option.label}
      onChange={(event, newValue) => {
        if (newValue && newValue.url) {
          navigate(newValue.url);
        }
      }}
      sx={{
        width: 300,
        border: "1px solid white",
        borderRadius: "4px",
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiInputLabel-root": {
          color: "white",
          "&.Mui-focused": {
            color: "white",
          },
        },
        "& .MuiAutocomplete-popupIndicator": {
          color: "white",
        },
        "& .MuiAutocomplete-clearIndicator": {
          color: "white",
        },
      }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}
