import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery} from '../services/cryptoApi';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';


const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100; //if count true set 10 
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setCryptos(filteredData)
    },[cryptosList, searchTerm])
    if(isFetching) return  <Box sx={{ display: 'flex', justifyContent:'center', minHeight:500}}>
    <CircularProgress sx={{mt:20}}/>
  </Box>
        return (
            <Container sx={{mt:5}}>
                {!simplified && (
                    <Container sx={{mx:'auto', mb:2}}>
                        <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          '& > :not(style)': { m: 1 },
                          justifyContent:"center"
                        }}
                      >

                        <TextField id="demo-helper-text-misaligned-no-helper" label="Name" onChange={(e) => setSearchTerm(e.target.value)}/>
                        </Box>
                    </Container>
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
            </Container>
        );
    }

export default Cryptocurrencies;