import React, { useEffect, useState, useReducer } from "react";
import IconCross from "../../../assets/images/icon-cross.svg";
import { useSelector } from "react-redux";
import BucketItems from "./bucketItems";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeCash, makeCredit } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";



 export default function Bucket() {
  const buckets = useSelector((state) => state.buckets);
  const {logged} = useSelector((state) => state.loginReducer);
  const [PaymentType, setPaymentType] = useState("credit");
  const [isButtonActive, setIsButtonActive]=useState(true)

const navigate=useNavigate()
const dispatch=useDispatch()

 

const sifarishEt=()=>{
    closeBasketModal()
   if(!logged){
navigate("/daxil-ol")
return
  }
  navigate("/sifarisi-resmilesdir")
    if(PaymentType=="credit"){
    dispatch(makeCredit())
    return 
  }
  dispatch(makeCash())
 }

  function selectPaymentMethod(selected) {
    if (PaymentType !== selected) setPaymentType(selected);
  }
  function closeBasketModal() {
    document.getElementById("BucketLive").style.display = "none";
  }

  const wholePriceHisse = buckets.filter((item)=>item?.installment).reduce(
    (previousValue, currentValue) =>{
       return previousValue + (currentValue.price+(currentValue.price*currentValue.percent/100))*currentValue.count
    
      },
    0
  )
  const wholePriceNagd = buckets.filter((item)=>!item?.installment).reduce(
    (previousValue, currentValue) =>{
       return previousValue + currentValue?.price*currentValue?.count
       },
    0
  )
const onBackgroundClick=(e)=>{
   if(e.target.className=="cart-wrapper"){
    closeBasketModal()
  }

}


useEffect(() => {
  
 if(buckets.length==0){
   setIsButtonActive(false)
   return
 }
if(PaymentType=="credit"){
  const creditArr=buckets.filter((bucket)=>bucket.installment)
  if(creditArr.length==0){
    setIsButtonActive(false)
    return
  }
  setIsButtonActive(true)
 }else{
   const nagdArr=buckets.filter((bucket)=>!bucket.installment)
   if(nagdArr.length==0){
    setIsButtonActive(false)
    return
  }
  setIsButtonActive(true)

 }

 }, [buckets, PaymentType])

   return (
    <div  className="bucket" id="BucketLive">
      <div onClick={onBackgroundClick} className="cart-wrapper">
        <div className="cart-container">
          <div className="basket-header">
            <h4>Sifariş səbəti</h4>
            <a
              className="close-cart wh-24 w-inline-block"
              onClick={closeBasketModal}
            >
              <img src={IconCross} loading="lazy" alt="" />
            </a>
          </div>
          <div className="basket-tab">
            <div className="basket-tab-btn">
              <div
                className={
                  PaymentType === "credit"
                    ? "basket-buttons basket-button-active w-button"
                    : "basket-buttons w-button"
                }
                onClick={() => {
                  selectPaymentMethod("credit");
                }}
              >
                Hissə-hissə
              </div>
              <div
                className={
                  PaymentType === "incash"
                    ? "basket-buttons basket-button-active w-button"
                    : "basket-buttons w-button"
                }
                onClick={() => {
                  selectPaymentMethod("incash");
                }}
              >
                Nağd
              </div>
            </div>
          </div>
          <div className="cart-form">
            <div className="active-state">
              <div className="w-layout-grid prd-grids">
                <BucketItems type={PaymentType} />
              </div>
              <div
                id="w-node-_05075f0c-dffb-da7b-0d6c-7efb682c7d26-39a5ea85"
                className="crt-footer"
              >
                <div className="crt-line">
                  <div className="crt-prc-name">Toplam Qiymət</div>
                  <div className="crt-price">   {PaymentType=="credit"? wholePriceHisse.toFixed(1): wholePriceNagd} AZN</div>
                </div>
             { isButtonActive &&  <div className="crt-action">
                  <a onClick={sifarishEt} className="cart-button w-button">SİFARİŞİ TAMAMLA </a>
                </div>}
              </div>
            </div>
            <div
              id="w-node-eed81317-3c0e-b185-b7a1-7652206e56e2-39a5ea85"
              className="empty-state"
            >
              <div className="empty-text-block">No items found.</div>
            </div>
            <div
              id="w-node-_822d59f9-9ec2-ed4d-13dd-e6eba3284b04-39a5ea85"
              className="error-state"
            >
              <div>Something went wrong when adding this item to the cart.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
