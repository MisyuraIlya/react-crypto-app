import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery} from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100; //if count true set 10 
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setCryptos(filteredData)
    },[cryptosList, searchTerm])
    if(isFetching) return 'Loading...'
        return (
            <>
                {!simplified && (
                    <div className='search-crypto' onChange={(e) => setSearchTerm(e.target.value)}>
                         <Input placeholder='Search Cryptocurrency'/>
                    </div>
                )}

                <Row gutter={[32,32]} className='crypto-card-container'>
                    {cryptos?.map((currency) => (
                        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                            <Link to={`/crypto/${currency.id}`}>
                                <Card 
                                    title={`${currency.rank} . ${currency.name}`}
                                    extra={<img className='crypto-image' src={currency.iconUrl}/>}
                                    hoverable
                                    >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>Daily change: {millify(currency.change)}</p>
                                </Card>
                            </Link>
                        </Col>
                    ))}

                </Row>
            </>
        );
    }

export default Cryptocurrencies;