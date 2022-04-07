import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import CircularProgress from '@mui/material/CircularProgress';
import LineChart from './LineChart';
import Box from '@mui/material/Box';
// const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return 
 <Box sx={{ display: 'flex', justifyContent:'center', minHeight:500  }}>
  <CircularProgress  />
</Box>

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <MonetizationOnIcon /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <BarChartIcon /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <DataSaverOffIcon /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <MonetizationOnIcon /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <FileUploadIcon /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <LocalGroceryStoreIcon /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <CurrencyExchangeIcon /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <Inventory2Icon /> : <Inventory2Icon />, icon: <Inventory2Icon /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <Inventory2Icon /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <Inventory2Icon /> },
  ];

  return (
    <Container >
      <Container  sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:"center"
          }}>
        <Typography variant="h6" gutterBottom component="div">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Typography>
      </Container>
      <Container  sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:"center"
          }}>
      <Typography>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</Typography>
      </Container>
      <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(value) => setTimeperiod(value)}
        >
          {time.map((date) =><MenuItem value={date}>{date}</MenuItem> )}

        </Select>
      </FormControl>
    </Box>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
      <Grid container spacing={2} sx={{mt:4}}>
      <Grid item xs={6}>
        <Container>
          <Container>
            <Typography>{cryptoDetails.name} Value Statistics</Typography>
            <Typography>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</Typography>
          </Container>
          {stats.map(({ icon, title, value }) => (
            <Container>
              <Stack direction="row" spacing={2} sx={{m:2}}>
                <Typography>{icon}</Typography>
                <Typography sx={{flexGrow:1}}>{title}</Typography>
                <Typography className="stats">{value}</Typography>
              </Stack>
              <Divider />
            </Container>
          ))}
        </Container>
      </Grid>
      <Grid item xs={6}>
      <Container>
          <Container>
            <Typography>{cryptoDetails.name} Other Stats Info</Typography>
            <Typography>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</Typography>
          </Container>
          {genericStats.map(({ icon, title, value }) => (
            <Container>
              <Stack direction="row" spacing={2} sx={{m:2}}>
                <Typography>{icon}</Typography>
                <Typography sx={{flexGrow:1}}>{title}</Typography>
                <Typography className="stats">{value}</Typography>
              </Stack>
              <Divider  />
            </Container>
          ))}
        </Container>
        </Grid>
      </Grid>

      <Container sx={{mt:4}}>
        <Grid container spacing={2}>
         <Grid item xs={6}>
          <Typography>What is {cryptoDetails.name}?</Typography>
          {HTMLReactParser(cryptoDetails.description)}
        </Grid>

        <Grid item xs={6}>
          <Typography>{cryptoDetails.name} Links</Typography>
          {cryptoDetails.links?.map((link) => (
            <Stack direction='row' spacing={2} sx={{mt:3}}>
              <Typography variant="h5" gutterBottom component="div">{link.type}</Typography>
              <Link href={link.url} underline="none"><Typography variant="h5" gutterBottom component="div">{link.name}</Typography></Link>
              
            </Stack>
          ))}
        </Grid>

        </Grid>
      </Container>
    </Container>
  );
};

export default CryptoDetails;