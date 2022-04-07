import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
const Footer = () => {
    return (
        <AppBar position="static"sx={{bgcolor:'#121858'}} >
            <Typography sx={{mt:2, textAlign:'center'}}>
                CryptoVerse All rights reserved
            </Typography>
                <Stack direction='row' sx={{textAlign:'center', justifyContent:'center', display:'flex', m:2}} spacing={4}>
                    <Link href='/' underline='none'>Home</Link>
                    <Link href='/news' underline='none'>News</Link>
                    <Link href='/cryptocurrencies' underline='none'>Cryptocurrencies</Link>
                </Stack>
        </AppBar>
    );
};

export default Footer;