import React, { Component } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const { Title } = Typography

const Homepage = () => {

        const {data, isFetching} = useGetCryptosQuery(10);
        // console.log(data)
        const globalStats = data?.data?.stats;
        if (isFetching) return 'Locaing...'

        return (
            <>
                <Title level={2} className='heading'>Global Ctypto Stats</Title>
                <Row>
                    <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}></Statistic></Col>
                    <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}></Statistic></Col>
                    <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}></Statistic></Col>
                    <Col span={12}><Statistic title="Total 24h volume" value={millify(globalStats.total24hVolume)}></Statistic></Col>
                    <Col span={12}><Statistic title="Total 24h Markets" value={millify(globalStats.totalMarkets)}></Statistic></Col>
                </Row>
                <div className='home-heading-containerm'>
                    <Title level={2} className='home-title'>Top 10 cryptocurrencies in the world</Title>
                    <Title level={2} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
                </div>
                <Cryptocurrencies simplified />  
                <div className='home-heading-containerm'>
                    <Title level={2} className='home-title'>Latest Crypto News</Title>
                    <Title level={2} className='show-more'><Link to='/news'>Show more</Link></Title>
                </div>
                <News simplified/>
            </>
        );
    }


export default Homepage;