import React from 'react';
import Textarea from '@mui/material/TextField';

const TextBox = ({ text, setText }) => {
    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <textarea value={text} onChange={handleChange} name="" id=""></textarea>
    );
};

export default TextBox;
