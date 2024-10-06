import instance from '../utils/axios';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FireModal from './FireModal';

const AppBarComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const getIsAuthenticated = async () => {
            const response = await instance.get("/isAuthenticated")
            if (response.status == 204) {
                setIsAuthenticated(true)
                console.log(isAuthenticated)
            }
        }
        getIsAuthenticated()
    }, [])

    const logout = async () => {
        const response = await instance.get("/logout")
        setIsAuthenticated(false)
    }


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

                {!isAuthenticated ? <>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button onClick={handleSpotifyAuth} color="inherit">Login</Button>
                        <Button variant="outlined" color="inherit">Signup</Button>
                    </Box>

                </> : <>
                    <Button variant="outlined" onClick={() => { setModalOpen(true) }} color="inherit">Logout</Button>
                </>
                }
                <FireModal open={modalOpen}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Are you sure you want to logout?
                    </Typography>
                    <Button onClick={() => { logout(); setModalOpen(false) }} variant="outlined" color="inherit">Yes</Button>
                    <Button onClick={() => { setModalOpen(false) }} color="inherit">No</Button>
                </FireModal>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
