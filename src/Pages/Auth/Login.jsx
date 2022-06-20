import React from 'react';
import Announce from '../../components/Head/Announce/index';
import Navbar from '../../components/Navbar/Head/index';
import NavigationBar from '../../components/Navbar/Bar';
import CookieAppear from '../../components/Additional/Cookie/index'
import Footer from '../../components/Footer/index';
//exp login
import LoginComp from '../../components/Login/index'
import Bucket from '../../components/Additional/Bucket/index';
import Wishlist from '../../components/Additional/Wishlist';

export default function Login() {
    return (
        <>
            <Announce/>
            <Bucket/> 
            <Wishlist />
            <Navbar/>
            <div className="dropdown-overlay"></div>
            <NavigationBar/>
            <LoginComp/>
            <CookieAppear/>
            <Footer/>
        </>
    );
  }