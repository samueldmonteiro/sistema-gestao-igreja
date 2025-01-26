import { Button } from '@mui/material'
import React from 'react'

const Buttom = ({ value, ...props }) => {
    return (
        <Button
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
        </Button>
    )
}

export default Buttom