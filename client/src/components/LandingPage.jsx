import React, { useCallback, useState } from 'react';
import { Box, Typography, Button, styled, withTheme } from '@mui/material';
import axios from '../utils/axios';
import { fetchFileText } from '../utils/sendFile';
import TextBox from './forms/TextBox';

const DropZone = styled('div')(({ theme }) => ({
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const Home = () => {
    const [file, setFile] = useState(null);
    const [fileText, setFileText] = useState("")

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleChange = useCallback(async (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }, [file]);

    const getFileText = useCallback(async () => {
        const text = await fetchFileText(file);
        setFileText(text)
    }, [setFileText, file])

    const sendFileTest = async () => {
        await getFileText()
    }


    return (
        <Box display="flex" p={2}>
            <Button variant='contained' onClick={sendFileTest} >click </Button>
            <Box flex={1}>
                <img src="" alt="Hero Image" style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography variant="h4" gutterBottom>
                    Main Header
                </Typography>
                <Typography variant="subtitle1">
                    This is a subheader.
                </Typography>
            </Box>
            <Box flex={1} ml={2}>
                <DropZone onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Typography variant="body1">
                        Drag and drop your file here or click the button below to upload.
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={handleChange}
                        />
                    </Button>
                    {file && <Typography mt={2}>File: {file.name}</Typography>}
                </DropZone>
            </Box>


            < TextBox text={fileText} setText={setFileText} />





        </Box>
    );
};

export default Home;
