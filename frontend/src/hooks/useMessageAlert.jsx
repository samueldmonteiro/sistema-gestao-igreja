import { Alert } from '@mui/material';
import React, { useState } from 'react'

const useMessageAlert = () => {

    const [message, setMessage] = useState(null);

    const showMessage = (content, type = 'success') => {
        setMessage(
            <Alert sx={{ textAlign: 'center', transition: '0.4s ease' }} variant="filled" severity={type}>
                {content}
            </Alert>
        );
    }

    const hideMessage = ()=>{
        setMessage(null);
    }

    return { showMessage, hideMessage, message };
}

export default useMessageAlert;