import React from 'react'
import trash from '../../Assets/images/Trash.svg'
import edit from '../../Assets/images/edit.svg'
import { IconButton } from '@mui/material';

export function EditButton({ func }) {
    const boxSX = {
        "&:hover": {
            transform: 'scale(1.1)',
            opacity: '0.7'
        },
    };
    return (
        <>
                <IconButton aria-label="edit" sx={boxSX} onClick={func}>
                    <img src={edit} alt="trash" />
                </IconButton>
         
        </>
    )
}


export function DeleteButton({ func }) {
    const boxSX = {  
        "&:hover": {
            transform: 'scale(1.1)',
            opacity: '0.7'
        },
    };
    return (
        <>
                <IconButton aria-label="delete" sx={boxSX} onClick={func}>
                    <img src={trash} alt="trash" />
                </IconButton>
          
        </>
    )
}



