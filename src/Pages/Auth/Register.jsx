  import React from 'react';
  import Announce from '../../components/Head/Announce/index';
  import Navbar from '../../components/Navbar/Head/index';
  import NavigationBar from '../../components/Navbar/Bar';
  import CookieAppear from '../../components/Additional/Cookie/index'
  import Footer from '../../components/Footer/index';
  import Bucket from '../../components/Additional/Bucket/index';
  //exp login
  import RegisterComp from '../../components/Register/index'
import Wishlist from '../../components/Additional/Wishlist';
  
  export default function Register() {
      return (
          <>
              <Announce/>
              <Bucket/>
              <Wishlist />
              <Navbar/>
              <div className="dropdown-overlay"></div>
              <NavigationBar/>
              <RegisterComp/>
              <CookieAppear/>
              <Footer/>
          </>
      );
    }