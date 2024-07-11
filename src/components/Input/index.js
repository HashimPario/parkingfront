import { TextField } from "@mui/material";
import React from "react";


const Input = ({type,name,change,label,myclass,val,onBlur,variant,keypress,disable}) => {
    return(
        <TextField  
        type={type}
        name={name}
        onChange={change}
        value={val}
        onBlur={onBlur}
        label={label}
        className={myclass}
        // required={true}
        disabled = {disable}
        variant={variant}
        onKeyDown={keypress}
        />
    )
}

export default Input;