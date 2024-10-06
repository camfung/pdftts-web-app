import React from 'react';
import { Modal, Box, Typography, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FireModal = ({ open, onClose, title, children }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#001D3D',
        borderRadius: 8,
        boxShadow: 24,
        p: 4,
        color: 'white',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
    };

    const transitionDuration = {
        enter: 250,
        exit: 250,
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            aria-labelledby="fire-modal-title"
            aria-describedby="fire-modal-description"
        >
            <Fade in={open} timeout={transitionDuration}>
                <Box sx={style}>
                    <Box sx={headerStyle}>
                        <Typography id="fire-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        <IconButton onClick={onClose} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography id="fire-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                        {children}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
};

export default FireModal;
