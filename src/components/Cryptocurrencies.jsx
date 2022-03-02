import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Row, Col, Input} from 'antd'
import { useGetCryptosQuery} from '../services/cryptoApi';
import Loader from './Loader';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100; //if count true set 10 
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setCryptos(filteredData)
    },[cryptosList, searchTerm])
    if(isFetching) return <Loader/>
        return (
            <>
                {!simplified && (
                    <div className='search-crypto' onChange={(e) => setSearchTerm(e.target.value)}>
                         <Input placeholder='Search Cryptocurrency'/>
                    </div>
                )}

                <Grid container spacing={2}>
                    {cryptos?.map((currency) => (
                  <Grid item xs={3}>

                    <Card sx={{ minWidth: 275, maxWidth: 600,ml:3 }}>
                        <CardContent>
                            <Stack direction="row">
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {`${currency.rank} . ${currency.name}`}
                                </Typography>
                                <Avatar alt="Remy Sharp" src={currency.iconUrl} />
                             </Stack>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Price: {millify(currency.price)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Market Cap: {millify(currency.marketCap)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Daily change: {millify(currency.change)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"><Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>Learn More</Link></Button>
                        </CardActions>
                    </Card>
                    </Grid>

                    ))}
                </Grid>
            </>
        );
    }

export default Cryptocurrencies;