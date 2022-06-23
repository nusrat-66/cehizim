import React, {useEffect, useState} from 'react'
import sampleproductimage from '../../../assets/images/61a0183a6b729668a9f894a9_square-02-p-500.jpeg';
import deleteBTN from '../../../assets/images/delete.svg';
import {deleteWishListStorage} from "../../../redux/actions"
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import agent from '../../../api/agent';


function WishListItem({id}) {
    const [wishData, setWishData] = useState({})
const dispatch=useDispatch()
 const deleteButton=()=> {
 dispatch(deleteWishListStorage(id))
}

useEffect(async() => {
     if(id){
  const detailedData=await agent.WishListRelated.getelementById(parseInt(id))
 setWishData(detailedData)
 }
}, [id])

 
 
function closeWishModal() {
    document.getElementById("Wishlist").style.display = "none";
  }
   return (
    <div  id="w-node-f10a1b06-03d3-c0d3-94aa-a20fe9af670e-39a5ea85" className="crt-items">
    <div className="product-img-block">
    <NavLink onClick={closeWishModal} to={`/mehsul/${id}`}>
        <img src={"https://ferrumcapital.s3.eu-north-1.amazonaws.com"+wishData.imageUrl} loading="lazy" alt="" className="product-image" />
        </NavLink>
    </div>
    <div className="crt-item-details">
        <div className="crt-product-det">
            <div className="cart-prd-name">{wishData.productName}</div>
            <div className="cart-prd-price">{wishData.price} AZN</div>
        </div>
        <div onClick={deleteButton} className="cart-prd-remove">
            <a id="w-node-f10a1b06-03d3-c0d3-94aa-a20fe9af6717-39a5ea85" href="#" className="remove-block w-inline-block">
     
                <img src={deleteBTN} loading="lazy" id="w-node-e5717e3a-c2a9-3441-feb3-8a6409123d88-39a5ea85" alt="" className="wh-20" />
             </a>
        </div>
    </div>
</div>
  )
}

export default WishListItem