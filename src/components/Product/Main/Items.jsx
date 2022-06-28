import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { deleteWishListStorage,addWishListStorage  } from '../../../redux/actions'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeartIcon from '../../../assets/images/heart.svg';
import redHeart from "../../../assets/images/redHeart.svg"


 

  
export function Items({ currentItems }) {
 
      const wishList=useSelector((state)=>state.wishList)
      const categories=useSelector((state)=>state.categorieReducer)

    const dispatch=useDispatch()
    const wishListAdd=(id)=>{
        dispatch(addWishListStorage(id))
      }
  
      const wishListDelete=(id)=>{
           dispatch(deleteWishListStorage(id))
        }



        const percentMaker=(object)=>{
              const percentObject=object.creditSettingMonth?.find((credit)=>{
                if(credit.month==12){
                    return credit.percent
                }
            })
             if(percentObject){
            const price=object.price
            const percent=percentObject?.percent
            return price+((price*percent)/100)
        }
        
        const catId=object.categoryId
        const catParentId=object.catParentId

        const percentObjectFromCat=categories.find((cat)=>(cat.id===catParentId || cat.id===catParentId))
        const percent=  percentObjectFromCat?.creditSetting?.creditSettingMonth.find((credit)=>{
        if(credit.month==12){
            return credit.percent
        }
    })
    const price=object.price
    const percent12=percent?.percent
    return price+((price*percent12)/100)
          }
     return (
      <>
  {
                            currentItems && currentItems.map((index, key) => {  return  <div key={key} id="w-node-b159fb1f-b7ac-c1a6-dc13-725622bb6de8-22bb6de8" className="product-img" >
                            { !wishList.includes(index.productId) &&
                             <div onClick={()=>wishListAdd(index.productId)} className="love-icon-badge"><img src={HeartIcon} loading="lazy" alt="" className="wh-20" /></div>
                             }
                              {wishList.includes(index.productId) &&
                             <div onClick={()=>wishListDelete(index.productId)} className="love-icon-badge"><img src={redHeart} loading="lazy" alt="" className="wh-20" /></div>
                             }
                             <Link to={"/mehsul/" + index.productId} className="product-dv-img w-inline-block">
                                 <div className="prd-dv">
                                     <img
                                         src={"https://ferrumcapital.s3.eu-north-1.amazonaws.com" + index.imageUrl}
                                         loading="lazy"alt=""
                                         className="product-image-h"
                                      />
                                 </div>
                             </Link>
                             <div className="product-heading">
                                 <h6 className="prd-title">{index.productName}</h6>
                                 <div className="total-price">{percentMaker(index)?.toFixed(2) } ₼</div>
                             </div>
                             <div className="prd-prc">
                                 <div className="month">
                                     <div className="prd-month">12 ay</div>
                                     <div className="prd-price">{(percentMaker(index)/12)?.toFixed(2)} ₼</div>
                                 </div>
                             </div>
                         </div>}
                             ) 
                        }
      </>
    );
  } 
 export default Items