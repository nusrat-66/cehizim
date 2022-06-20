import React, {useEffect, useState} from 'react';
import axios from 'axios';
 import { Link } from 'react-router-dom';
import HeartIcon from '../../../assets/images/heart.svg';
import redHeart from "../../../assets/images/redHeart.svg"
import { useDispatch } from 'react-redux'
import { deleteWishListStorage,addWishListStorage  } from '../../../redux/actions'
import { useSelector } from 'react-redux'
var decode = require('decode-html');

export default function CampaignDetailed() {

    const [NewestData, setNewestData] = useState(false);
    const wishList=useSelector((state)=>state.wishList)
    const dispatch=useDispatch()
    const wishListAdd=(id)=>{
        dispatch(addWishListStorage(id))
    }
    const wishListDelete=(id)=>{
        dispatch(deleteWishListStorage(id))
    }
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

 
    

    const [HighlitsData, setHighlitsData] = useState(false);
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: 'https://apis.digimall.az/api/Cehizim/GetHighlights',
            headers: {
                'Content-Type': 'application/json',
                'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
            }
        }).then(function (response) {
            let res__ = response.data;
            setHighlitsData(res__)
        });
        
    }, []);
    function createArrayForButton(data) {
        if(data)
            var tmp__ = data.split(";");
            return tmp__[0]
    }
    function createArrayForButtonLink(data) {
        if(data) {
            var tmp__ = data.split(";");
            return tmp__[1]
        }
        else {
            return "https://cehizim.az"
        }     
    }
    return(
        <>
        <div className="spc-section wf-section">
            <div className="dv-wrapper">
        
            {HighlitsData ? HighlitsData.map((index, key) => 
                <div className="w-layout-grid spc-banner" key={key}>
                    <div className="spc-1-dv">
                        <img
                            src={'https://cdn.otomall.az/' + index.imageUrl}
                            loading="lazy"
                            width="{675}"
                            id="w-node-_8c6567e9-f24b-96a8-f949-77edcd07ad73-39a5ea85"
                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 94vw, (max-width: 991px) 95vw, 96vw"
                            alt=""
                            className="spc-img-1"
                        />
                    </div>
                     <div className="section-beside background">
                        <div className="container-spc">
                            <h3 id="w-node-_4c868999-bec2-9818-7d22-d7131b580f2b-39a5ea85" className="spc-heading">{index.title}</h3>
                            <div className="alt-text">
                                <div id="w-node-_3de1c83f-d8e3-de6c-c557-87e2dc93ae5b-39a5ea85" className="alt-text-desc">
                                    <div dangerouslySetInnerHTML={{__html: decode(decode( index.description))}}/>
                                </div>
                                 <a href={createArrayForButtonLink(index.button)} className="btn-spc w-inline-block">
                                    <div className="btn-slide">{ createArrayForButton(index.button) }</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                )
                : <></>}
            </div>
         </div>
         <div className="dv-wrapper">
         {NewestData !== false ?
                NewestData.map((index, key) =>
                 {
                     if(key>1){
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
                                    <div className="total-price">{(element.price+(element.price*element.creditSettingPercentage)/100)} ₼</div>
                                </div>
                                <div className="prd-prc">
                                    <div className="month">
                                        <div className="prd-month">{element.creditSettingMonth} ay</div>
                                        <div className="prd-price">{((element.price+(element.price*element.creditSettingPercentage)/100)/element.creditSettingMonth).toFixed(2)} ₼ / ay</div>
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
                : <></>}</div>
        </>
    )
}