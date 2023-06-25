import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function SelectForm(props) {
  const [image, setImage] = useState("");

  const handleChange = (event) => {
    setImage(event.target.value);
    props.onChildData(event.target.value);
  };

const [menuItems, setMenuItems] = useState([]);

useEffect(() => {
    axios.get('http://127.0.0.1:5000/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100}}>
        <InputLabel id="demo-simple-select-autowidth-label">Select Image</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={image}
          onChange={handleChange}
          autoWidth
          label="Select Image"
          defaultValue={menuItems.length > 0 ? menuItems[0].value : ''}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

            {menuItems && menuItems.length > 0 && menuItems.map(item => (
            <MenuItem key={item.value} value={item.value}>
            {item.label}
            </MenuItem>
            ))}

        </Select>
      </FormControl>
    </div>
  );
}