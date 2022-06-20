import React, {useEffect} from 'react';
import Announce from '../../components/Head/Announce/index';
import Navbar from '../../components/Navbar/Head/index';
import NavigationBar from '../../components/Navbar/Bar';
import CookieAppear from '../../components/Additional/Cookie/index'
import Footer from '../../components/Footer/index';
import ProductDetailsComp from '../../components/Product/Detail/index';
import Bucket from '../../components/Additional/Bucket/index';
import Wishlist from '../../components/Additional/Wishlist';
import { useParams } from "react-router-dom";

export default function ProductDetails() {
    const params = useParams()
 

useEffect(() => {
    window.scrollTo(0, 0)
 }, [params])

    return (
        <>
            <Announce/>
            <Bucket />
            <Wishlist  />
            <Navbar/>
            <div className="dropdown-overlay"></div>
            <NavigationBar/>
            <ProductDetailsComp/>
            <CookieAppear/>
            <Footer/>
        </>
    );
  }