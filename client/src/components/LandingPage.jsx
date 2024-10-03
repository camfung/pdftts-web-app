import React, { useState } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import axios from '../utils/axios';

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

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSpotifyAuth = () => {
        // Redirect to Spotify authentication page
        window.location.href = "/spotify-login";
    };

    return (
        <Box display="flex" p={2}>
            <Button onClick={() => {
                axios.get("/users", { withCredentials: true })
            }
            }>click this if ur a bitch</Button>
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
        </Box>
    );
};

export default Home;
