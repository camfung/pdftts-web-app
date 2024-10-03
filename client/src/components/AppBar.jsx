
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AppBarComponent = () => {

    const handleSpotifyAuth = () => {
        // Redirect to Spotify authentication page
        window.location.href = import.meta.env.VITE_SERVER_URL + "/spotify-login";
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MyLogo
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
                    <Button color="inherit">Generate Speech</Button>
                    <Button color="inherit">How to Use</Button>
                    <Button color="inherit">Pricing</Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={handleSpotifyAuth} color="inherit">Login</Button>
                    <Button variant="outlined" color="inherit">Signup</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
