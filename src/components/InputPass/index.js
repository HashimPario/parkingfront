import { TextField } from "@mui/material";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';


const InputPass = ({ type, name, change, label, myclass, val, onBlur, variant, keypress, disable,}) => {
    return (
        <div style={{position:"relative", width:"100%"}}>
            <TextField
                type={type}
                name={name}
                onChange={change}
                value={val}
                onBlur={onBlur}
                label={label}
                className={myclass}
                // required={true}
                disabled={disable}
                variant={variant}
                onKeyDown={keypress}
            />
            <div>
                <VisibilityIcon/>
            </div>
        </div>
    )
}

export default InputPass;