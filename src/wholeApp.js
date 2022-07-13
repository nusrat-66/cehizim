import React, {useEffect} from 'react'
import App from "./App"
import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import Login from './Pages/Auth/Login'
import Otp from './Pages/Auth/Otp'
import Register from './Pages/Auth/Register'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import Profile from './Pages/Profile/index'
import Product from './Pages/Product/Main'
import ProductDetails from './Pages/Product/Details'
import Inspiration from './Pages/Inspiration/index';
import About from './Pages/About/index';
import Blog from './Pages/Blog/index';
import ReadBlogDetailed from './Pages/Blog/Read/index';
import Faq from './Pages/Faq/index'
import Return from './Pages/Return/index';
import Campaigns from './Pages/Campaigns/index'
import CampaignsAlot from './Pages/Campaigns/Alot/index'
import Checkout from './Pages/Checkout/index';
import { useDispatch } from 'react-redux';
import {takeItemsFromStorage, takeWishlistFromStorage, getCategories} from "./redux/actions"
import {login} from "./redux/actions"
import jwt_decode from "jwt-decode";
import axios from "axios"
import SearchPage from "./Pages/searchPage"
import Category from "./Pages/category"
import Endirimler from "./Pages/endirimler"
import Yeniler from "./Pages/yeniler"
import ErrorPage from "./Pages/404"
import Newest from "./components/Additional/Newest/index"
import Privacy from "./components/privacy"
import Policy from "./components/policy"



function WholeApp() {
  
       const dispatch=useDispatch()
    useEffect(() => {
      const stateFromLocal=localStorage.getItem("bucket")
      const wishlistFromLocal=localStorage.getItem("wishlist")
     if(stateFromLocal){
        dispatch(takeItemsFromStorage())
      }
     if(wishlistFromLocal){
       dispatch(takeWishlistFromStorage())
     }
    }, [])
  
useEffect(() => {
  dispatch(getCategories())
 }, [])
  

     useEffect(() => {
      let loginDatas=null
      var local_token = localStorage.getItem('token');
      if(local_token !== null) {
          var token = jwt_decode(localStorage.getItem('token'));
          axios({
              method: 'get',
              baseURL: `https://apis.digimall.az/api/Customers/GetCustomerByIdentityUserId/${token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`,
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                  'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
              }
          })
          .then(response=>{
              loginDatas=   {
                  name:`${response.data.name}`,
                  surName:`${response.data.family}`,
                  phoneNumber:response.data.cellPhone,
                  id:response.data.userId
              }
              return axios({
                  method: 'get',
                  baseURL: `https://apis.digimall.az/api/Customers/GetCustomerByIdentityUserId/${response.data.userId}`,
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                      'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
                  }
              })
          })
          .then(function (data) {
               dispatch(login({
           id:loginDatas.id, phoneNumber: loginDatas.phoneNumber, customerId:data.data.id, fullname:`${loginDatas.name} ${loginDatas.surName}`
                }))
 
          })
      }
   
  },
  []);

    return (
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="daxil-ol" element={<Login />} />
      <Route path="qeydiyyat" element={<Register />} />
      <Route path="sifremi-unutdum" element={<ForgotPassword />} />
      <Route path="otp" element={<Otp />} />
      <Route path="profil" element={<Profile/>} />
      <Route path="mehsul" element={<Product />} />
      <Route path="mehsul/:mehsulId" element={<ProductDetails />} />
      <Route path="ilhamlanma" element={<Inspiration />} />
      <Route path="haqqimizda" element={<About />} />
      <Route path="blog" element={<Blog/>} />
      <Route path="blog/:blogAdi" element={<ReadBlogDetailed/>} />
      <Route path="faq" element={<Faq/>} />
      <Route path="kredit-ve-geri-qaytarma" element={<Return/>} />
      <Route path="kampaniyalar" element={<CampaignsAlot/>} />
      <Route path="kampaniya/:id" element={<Campaigns/>} />
      <Route path="sifarisi-resmilesdir" element={<Checkout/>} /> 
      <Route path="axtarish/:search" element={<SearchPage/>} />
      <Route path="category/:cate" element={<Category/>} /> 
      <Route path="instagram" element={<Category/>} /> 
      <Route path="/endirimler" element={<Endirimler/>} /> 
      <Route path="/yeniler/:id" element={<Yeniler/>} />
      <Route path="/testprp" element={<Newest/>} /> 
      <Route path="/sertler" element={<Privacy/>} />
      <Route path="/mexfilik" element={<Policy/>} />
      <Route path="/istifadeci-razilasmasi" element={<Policy/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
  </BrowserRouter>
   )
}

export default WholeApp