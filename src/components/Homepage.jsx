import React, { Component } from 'react';
import millify from 'millify';
// import { Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
// const { Title } = Typography

const Homepage = () => {

        const {data, isFetching} = useGetCryptosQuery(10);
        // console.log(data)
        const globalStats = data?.data?.stats;
        if (isFetching) return <Loader/>

        return (
            <Container>
                <Typography variant="h4" className='heading'>Global Ctypto Stats</Typography>
                <Stack spacing={2} sx={{mt:4,mb:4}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Grid item xs={5}><Typography variant="h5" gutterBottom component="div">Total Global Stats: {globalStats.total}</Typography></Grid>
                            <Grid item xs={5}><Typography variant="h5" gutterBottom component="div">Total Ecxhanges: {millify(globalStats.totalExchanges)}</Typography></Grid>
                            <Grid item xs={5}><Typography variant="h5" gutterBottom component="div">Total Market Cap: {millify(globalStats.totalMarketCap)}</Typography></Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid item xs={7}><Typography variant="h5" gutterBottom component="div">Total 24h Volume: {millify(globalStats.total24hVolume)}</Typography></Grid>
                            <Grid item xs={7}><Typography variant="h5" gutterBottom component="div">Total 24h Markets: {millify(globalStats.totalMarkets)}</Typography></Grid>
                        </Grid>
                    </Grid>
                </Stack>
                <Grid container spacing={2} sx={{mt:2, mb:2}}>
                    <Grid item xs={10}>
                        <Typography variant="h4" className='home-title'>Top 10 cryptocurrencies in the world</Typography>
                    </Grid>
                    <Grid item xs={2}>
                         <Typography variant="h5" className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Typography>
                    </Grid>
                </Grid>
                <Cryptocurrencies simplified />  
                <Grid container spacing={2} sx={{mt:2, mb:2}}>
                    <Grid item xs={10}>
                        <Typography variant="h4" className='home-title'>Last Crypto News</Typography>
                    </Grid>
                    <Grid item xs={2}>
                         <Typography variant="h5" className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Typography>
                    </Grid>
                </Grid>
                <News simplified/>
            </Container>
        );
    }


export default Homepage;