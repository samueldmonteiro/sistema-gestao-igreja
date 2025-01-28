import { Button as Btn } from '@mui/material'
import React from 'react'

const Button = ({ value, ...props }) => {
    return (
        <Btn
            variant="contained"
            color="primary"
            {...props}
            sx={{
                mt: 1,
                borderRadius: "4px",
                padding: "10px 20px",
            }}
        >
            {value}
        </Btn>
    )
}

export default Button;