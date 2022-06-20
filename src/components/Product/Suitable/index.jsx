
import HeartIcon from '../../../assets/images/heart.svg';
import ProductImage from '../../../assets/images/img-00122.png';
import { Link } from "react-router-dom";
export default function ProductSuitable({relateds}) {
     return(
        <>
            {relateds.length>0 &&
        <div className="like-products wf-section">
            <div className="dv-wrapper">
                <div className="prd-heading">
                <h3 className="section-title">Uyğun məhsullar </h3>
                <Link to="/mehsul" className="more-btn w-inline-block">
                    <div className="more-text">
                    <div className="see-mr">DAHA ÇOX</div>
                    <img src="images/arrow.svg" loading="lazy" alt="" className="see-more-icon" />
                    </div>
                </Link>
                </div>
                <div className="w-layout-grid prd-grid">



          { relateds.map(related=> <div id="w-node-b159fb1f-b7ac-c1a6-dc13-725622bb6de8-22bb6de8" className="product-img">
                    <div className="love-icon-badge">
                    <img src={HeartIcon} loading="lazy" alt="" className="wh-20" />
                    </div>
                    <Link to="palma-desti" aria-current="page" className="product-dv-img w-inline-block w--current">
                    <div className="prd-dv">
                        <img src={ProductImage} loading="lazy" data-w-id="b159fb1f-b7ac-c1a6-dc13-725622bb6deb" sizes="(max-width: 479px) 93vw, (max-width: 767px) 94vw, (max-width: 991px) 95vw, 467.0625px" alt="" className="product-image-h" />
                    </div>
                    </Link>
                    <div className="product-heading">
                    <h6 className="prd-title">palma dəstİ</h6>
                    <div className="total-price">605.4 ₼</div>
                    </div>
                    <div className="prd-prc">
                    <div className="month">
                        <div className="prd-month">12 ay</div>
                        <div className="prd-price">50.45 ₼</div>
                    </div>
                    </div>
                </div>)     }


     
 
                </div>
            </div>
            </div>
         }
         </>
    )
}