import React, { Component, useState } from 'react';
// import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/CryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
// import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'; 
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';


const {Text, Title} = Typography;
// const { Option } = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({simplified}) => {
        const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
        const {data : cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12})
        const {data} = useGetCryptosQuery(100);
        if(!cryptoNews?.value) return <Loader/>
        return (
            <Grid container spacing={2}>
                    {cryptoNews.value.map((news,i) => (
                <Grid item xs={3}>

                    <Card sx={{ minWidth: 275, maxWidth: 600,ml:3 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={news?.image?.thumbnail?.contentUrl || demoImage}
                        alt="green iguana"
                    />
                        <CardContent>
                            <Stack direction="row">
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {news.name}
                                </Typography>
                                {/* <Avatar alt="Remy Sharp" src={currency.iconUrl} /> */}
                             </Stack>
                            <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                            {news.description > 30 
                                    ? `${news.description.substring(0,30)}...`
                                    : news.description
                                    }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"><Link href={news.url} underline="none">Learn More</Link></Button>
                        </CardActions>
                        <CardContent>
                        <Stack direction="row">
                               <Typography variant="body2" component="div" sx={{ flexGrow: 1 }} color="text.secondary">
                                    {moment(news.datePublished).startOf('ss').fromNow()}
                                </Typography>
                                <Avatar src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
                        </Stack>
                        </CardContent>
                        
                    </Card>
                </Grid>
                    ))}
            </Grid>
        );
}

export default News;