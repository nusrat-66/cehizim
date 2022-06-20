import React from 'react';
import Announce from '../../components/Head/Announce/index';
import Navbar from '../../components/Navbar/Head/index';
import NavigationBar from '../../components/Navbar/Bar';
import CookieAppear from '../../components/Additional/Cookie/index'
import Footer from '../../components/Footer/index';

import WarrantyComp from '../../components/Return/Warranty/index';
import TermsComp from '../../components/Return/Terms/index';
import CreditReturnComp from '../../components/Return/CreditReturn/index';

import Bucket from '../../components/Additional/Bucket/index';
import Wishlist from '../../components/Additional/Wishlist';
export default function Return() {
    return (
        <>
            <Announce/>
            <Bucket/>
            <Wishlist/>
            <Navbar/>
            <div className="dropdown-overlay"></div>
            <NavigationBar/>
            <WarrantyComp/>
            <TermsComp/>
            <CreditReturnComp/>
            <CookieAppear/>
            <Footer/>
        </>
    );
  }