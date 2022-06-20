import React, { useEffect } from "react"
import closeIcon from '../../../assets/images/icon-cross.svg';
import WishListItem from './wishListItem';
import { useSelector } from 'react-redux';

export default function Wishlist() {
    function closeWishModal() {
        document.getElementById("Wishlist").style.display = "none";
      }
      const wishList=useSelector((state=>state.wishList))

 
    return(
        <div className="wishlist" id="Wishlist">
            <div className="cart-wrapper">
                <div className="cart-container">
                    <div className="cart-header">
                        <h4>Favoritlər</h4>
                        <a className="close-cart wh-24 w-inline-block" onClick={closeWishModal}>
                            <img src={closeIcon} loading="lazy" alt="" />
                        </a>
                    </div>
                    <div className="cart-form">
                        <div className="active-state">
                            <div className="w-layout-grid prd-grids">
                            
                        {wishList.map((wish, index)=><WishListItem id={wish} key={index}/>)}

 
                            </div>
                        </div>
                    <div id="w-node-f10a1b06-03d3-c0d3-94aa-a20fe9af6741-39a5ea85" className="empty-state">
                        <div className="empty-text-block">No items found.</div>
                    </div>
                    <div id="w-node-f10a1b06-03d3-c0d3-94aa-a20fe9af6744-39a5ea85" className="error-state">
                        <div>Something went wrong when adding this item to the cart.</div>
                    </div>
                </div>
                </div>
            </div>
            </div>

    )
}