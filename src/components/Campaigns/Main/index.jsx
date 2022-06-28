import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
 import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
 import HeartIcon from '../../../assets/images/heart.svg';
import redHeart from "../../../assets/images/redHeart.svg"
import { deleteWishListStorage,addWishListStorage  } from '../../../redux/actions'

export default function CampaignsComp({campaigns, error}){
const dispatch=useDispatch()
      const priceTaker=(element)=>{
        let percent;
        let month;
    element.creditSettingMonth.forEach(elem=>{
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

    const wishList=useSelector((state)=>state.wishList)


  const creditPriceTake=(object)=>{
    object.creditSettingMonths.forEach(element =>{
        if(element.month===12){
             return object.price+((object.price*element.percent/100).toFixed(1))
        }
    });
}

const wishListAdd=(id)=>{
    dispatch(addWishListStorage(id))
  }

  const wishListDelete=(id)=>{
       dispatch(deleteWishListStorage(id))
    }
 const params=useParams()
       useEffect(() => {
        window.scrollTo(0, 0)
     }, [params])

     return(
          <div className="prdct-page-title wf-section">
             <div className="dv-wrapper">
                 <div className="w-layout-grid sidebar-layout-grid sidebar-layout-grid__sp">
                       <div className="w-layout-grid right-side right-side_4x">
        {campaigns.map(campaign=> <div key={campaign.id} id="w-node-b159fb1f-b7ac-c1a6-dc13-725622bb6de8-22bb6de8" className="product-img">
       { !wishList.includes(campaign.productId) &&
                             <div onClick={()=>wishListAdd(campaign.productId)} className="love-icon-badge"><img src={HeartIcon} loading="lazy" alt="" className="wh-20" /></div>
                             }
                              {wishList.includes(campaign.productId) &&
                             <div onClick={()=>wishListDelete(campaign.productId)} className="love-icon-badge"><img src={redHeart} loading="lazy" alt="" className="wh-20" /></div>
                             }
                            <Link to={"/mehsul/"+campaign.productId} className="product-dv-img w-inline-block">
                                <div className="prd-dv">
                                    <img
                                        src={"https://ferrumcapital.s3.eu-north-1.amazonaws.com"+campaign.imageUrl}
                                        loading="lazy"
                                        sizes="(max-width: 479px) 93vw, (max-width: 767px) 94vw, (max-width: 991px) 95vw, 467.0625px"
                                        alt=""
                                        className="product-image-h"
                                    />
                                </div>
                            </Link>
                            <div className="product-heading">
                                <h6 className="prd-title">{campaign.name}</h6>
                                <div className="total-price">{priceTaker(campaign).price} ₼</div>
                            </div>
                            <div className="prd-prc">
                                <div className="month">
                                    <div className="prd-month">{priceTaker(campaign).month} ay</div>
                                    <div className="prd-price">{priceTaker(campaign).MonthlyPrice} ₼</div>
                                </div>
                            </div>
                        </div>)               }
                       </div>
                </div>
                {/* <div className="pagination">
                    <a href="/" className="pag-left gap-r-24 w-inline-block"><img src={LeftIcon} loading="lazy" alt="" className="wh-20" /></a>
                    <a href="/" className="num gap-r-12 w-inline-block">
                        <div className="num-pag active">1</div>
                    </a>
                    <a href="/" className="num w-inline-block">
                        <div className="num-pag">2</div>
                    </a>
                    <a href="/" className="pag-right gap-l-24 w-inline-block"><img src={RightIcon} loading="lazy" alt="" className="wh-20" /></a>
                </div> */}
            </div>
        </div>
    );
}