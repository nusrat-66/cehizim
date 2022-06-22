
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeartIcon from '../../../assets/images/heart.svg';
import redHeart from "../../../assets/images/redHeart.svg"
import { useDispatch } from 'react-redux'
import { deleteWishListStorage,addWishListStorage  } from '../../../redux/actions'
import { useSelector } from 'react-redux'
import agent from '../../../api/agent';


export default function Newest() {
    const [NewestData, setNewestData] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            baseURL: 'https://apis.digimall.az/api/Cehizim/GetNewestProdultList',
            headers: {
                'Content-Type': 'application/json',
                'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
            }
            }).then(function (response) {
                setNewestData(response.data)
            });
    }, [])
    const wishList=useSelector((state)=>state.wishList)
    const dispatch=useDispatch()
    const wishListAdd=(id)=>{
        dispatch(addWishListStorage(id))
    }
    const wishListDelete=(id)=>{
        dispatch(deleteWishListStorage(id))
    }

const priceTaker=(element)=>{
    let percent;
    let month;
element.creditSettingMonths.forEach(elem=>{
    if(elem.month===12){
        percent=elem.percent
        month=12
    }
 })
if(!month){
    percent=element?.creditSettingMonths[0]?.percent
    month=element?.creditSettingMonths[0]?.month
}

const price=element.price-(element.price*percent/100)
const MonthlyPrice= (element.price-(element.price*percent/100))/month
return {month , MonthlyPrice:MonthlyPrice.toFixed(0), price:price.toFixed(0)}
}


    return(
        <>
          {NewestData !== false ?
                NewestData.map((index, key) =>
                  {
                     if(key<2){
               return <>
                 <div className="prd-hd" key={key}>
                    <h3 className="section-title">{index.title} </h3>
                    <Link to={`/yeniler/${index.id}`} className="more-btn w-inline-block">
                        <div className="more-text">
                            <div className="see-mr">DAHA ÇOX</div>
                            <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620e341e0ecefe5d8342063c_arrow.svg" loading="lazy" alt="" className="see-more-icon" />
                        </div>
                    </Link>
                </div>
                  <div className="w-layout-grid prd-grid campaign-cs-last">
                    {
                        index.productDetails.map((element, index) =>
                         {if(index<4){
                          return <div className="product-img" key={index}>
                                 { !wishList.includes(element.productId) &&
                             <div onClick={()=>wishListAdd(element.productId)} className="love-icon-badge"><img src={HeartIcon} loading="lazy" alt="" className="wh-20" /></div>
                             }
                              {wishList.includes(element.productId) &&
                             <div onClick={()=>wishListDelete(element.productId)} className="love-icon-badge"><img src={redHeart} loading="lazy" alt="" className="wh-20" /></div>
                             }
                                 <Link to={`/mehsul/${element.productId}`} className="product-dv-img w-inline-block">
                                    <div className="prd-dv">
                                        <img
                                            src={`//cdn.otomall.az/${element.imageUrl}`}
                                            loading="lazy"
                                            alt=""
                                            className="product-image-h"
                                             />
                                    </div>
                                </Link>
                                <div className="product-heading">
                                    <h6 className="prd-title">{element.productName}</h6>
                                    <div className="total-price">{priceTaker(element).price} ₼</div>
                                </div>
                                <div className="prd-prc">
                                    <div className="month">
                                        <div className="prd-month">{priceTaker(element).month} ay</div>
                                        
                                         <div className="prd-price">{priceTaker(element).MonthlyPrice} ₼ / ay</div>
                                    </div>
                                </div>
                            </div>}
                            }
                        )
                    }
                </div>
                <br/>
                </>}}
                )
                : <></>}
         </>
    )
}