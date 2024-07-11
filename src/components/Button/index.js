import React from "react";
import {Button} from "@mui/material"


const Button = ({myclass,btnText,click,disable,type,color,variant}) => {
    return(
        <Button
        className={myclass}
        onClick={click}
        disabled = {disable}
        color={color}
        variant={variant}
        type={type}
        >    
            {btnText}
        </Button>
    )
}

export default Button;