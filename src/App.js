//Global
import React from "react";
import {Switch,Route,Link} from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
//Local
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails'; 
import News from "./components/News";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className='app'>
                <Navbar/>
                <Layout>
                        <Switch>
                            <Route exact path='/'>
                                <Homepage/>
                            </Route>
                            <Route exact path='/cryptocurrencies'>
                                <Cryptocurrencies/>
                            </Route>
                            <Route exact path='/crypto/:coinId'>
                                <CryptoDetails/>
                            </Route>
                            <Route exact path='/news'>
                                <News/>
                            </Route>
                        </Switch>
                </Layout>
                <Footer/>

            </div>

    );
};

export default App;