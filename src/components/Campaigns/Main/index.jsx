import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '../../../assets/images/add.svg';
import HeartIcon from '../../../assets/images/heart.svg';
import ExampleImg from '../../../assets/images/img-00122.png';
import LeftIcon from '../../../assets/images/arrow-left.svg';
import RightIcon from '../../../assets/images/arrow-right.svg';
import ArrowIcon from '../../../assets/images/bc-arrow.svg';
import { useParams } from "react-router-dom";
import agent from '../../../api/agent';




export default function CampaignsComp({campaigns, error}){
 const creditPriceTake=(object)=>{
    object.creditSettingMonths.forEach(element => {
        if(element.month===12){
             return object.price+((object.price*element.percent/100).toFixed(1))
        }
    });
}

const params=useParams()
       useEffect(() => {
        window.scrollTo(0, 0)
     }, [params])

     return(
          <div className="prdct-page-title wf-section">
            <div className="dv-wrapper">
                 <div className="w-layout-grid sidebar-layout-grid sidebar-layout-grid__sp">
                     <div className="w-layout-grid right-side">
       {campaigns.map(campaign=> <div key={campaign.id} id="w-node-b159fb1f-b7ac-c1a6-dc13-725622bb6de8-22bb6de8" className="product-img">
                            <div className="love-icon-badge">
                                <img src={HeartIcon} loading="lazy" alt="" className="wh-20" /></div>
                            <Link to="/mehsul/palma-desti" className="product-dv-img w-inline-block">
                                <div className="prd-dv">
                                    <img
                                        src={ExampleImg}
                                        loading="lazy"
                                        sizes="(max-width: 479px) 93vw, (max-width: 767px) 94vw, (max-width: 991px) 95vw, 467.0625px"
                                        alt=""
                                        className="product-image-h"
                                    />
                                </div>
                            </Link>
                            <div className="product-heading">
                                <h6 className="prd-title">{campaign.productName}</h6>
                                <div className="total-price">{creditPriceTake(campaign)} ₼</div>
                            </div>
                            <div className="prd-prc">
                                <div className="month">
                                    <div className="prd-month">12 ay</div>
                                    <div className="prd-price">{(creditPriceTake(campaign)/12).toFixed()} ₼</div>
                                </div>
                            </div>
                        </div>)               }
                       </div>
                </div>
                <div className="pagination">
                    <a href="/" className="pag-left gap-r-24 w-inline-block"><img src={LeftIcon} loading="lazy" alt="" className="wh-20" /></a>
                    <a href="/" className="num gap-r-12 w-inline-block">
                        <div className="num-pag active">1</div>
                    </a>
                    <a href="/" className="num w-inline-block">
                        <div className="num-pag">2</div>
                    </a>
                    <a href="/" className="pag-right gap-l-24 w-inline-block"><img src={RightIcon} loading="lazy" alt="" className="wh-20" /></a>
                </div>
            </div>
        </div>
    );
}