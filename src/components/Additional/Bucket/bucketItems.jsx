import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {deleteItem, countChange} from "../../../redux/actions"
import deleteBTN from '../../../assets/images/delete.svg';
 
function BucketItems({type}) {

const buckets=useSelector((state)=>state.buckets)
 const dispatch=useDispatch()

 const quantityChange=(id)=>{
  return (e)=>{
      dispatch(countChange({id, count: parseInt(e.target.value)}))
    
}
}
 
return (
    <>
    {type=="credit" &&
      buckets.map((bucket)=>{
        if(bucket?.installment){
          return <div key={Math.random()} id="w-node-_9ac3cf99-a23a-9a9c-8ee8-f832a2a44f87-39a5ea85" className="crt-items">
          <div className="product-img-block">
                <img
                  src={"https://cdn.otomall.az/"+bucket.image}
                  loading="lazy"
                  sizes="100vw"
                  alt=""
                  className="product-image"
              />
          </div>
          <div className="crt-item-dtls">
              <div className="cart-prd-name">{bucket.title}</div>
              <div id="w-node-_595d36d0-ee5d-7021-d676-aa64f92e7014-39a5ea85" className="cart-prd-price">{bucket.price+(bucket.price*bucket.percent/100)} AZN</div>
              <div className="cart-prd-del">
                  <a id="w-node-_5dc36c29-4152-f7f7-cbb5-ef5bd7b5cca0-39a5ea85" className="trashbin-icon remove-block w-inline-block">
                    <img src={deleteBTN} />
                    <div onClick={()=> dispatch(deleteItem(bucket.id))} className="remove">Sil</div>
                  </a>
              </div>
          </div>
          <div className="cart-quantity-block">
              <div className="crt-quantity w-embed">
                  <input  style={{paddingleft: "1rem"}}   pattern="^[0-9]+$" inputMode="numeric"  className="crt-quantity" type="number" name="quantity" value={bucket.count} onChange={quantityChange(bucket.id)}  min={1}/>
              </div>
          </div>
      </div>
        }
      })
    }
     {
      type=="incash" && buckets.map((bucket)=>{
        if(bucket.installment==null){
          return <div key={Math.random()} id="w-node-_9ac3cf99-a23a-9a9c-8ee8-f832a2a44f87-39a5ea85" className="crt-items">
          <div className="product-img-block">
              <img
                  src={"https://cdn.otomall.az/"+bucket.image}
                  loading="lazy"
                  sizes="100vw"
                  alt=""
                  className="product-image"
              />
          </div>
          <div className="crt-item-dtls">
              <div className="cart-prd-name">{bucket.title}</div>
              <div id="w-node-_595d36d0-ee5d-7021-d676-aa64f92e7014-39a5ea85" className="cart-prd-price">{bucket.price} AZN</div>
              <div className="cart-prd-del">
                  <a id="w-node-_5dc36c29-4152-f7f7-cbb5-ef5bd7b5cca0-39a5ea85" className="trashbin-icon remove-block w-inline-block">
                    <img src={deleteBTN} />
                    <div onClick={()=>dispatch(deleteItem(bucket.id))} className="remove">Sil</div>
                  </a>
              </div>
          </div>
          <div className="cart-quantity-block">
              <div className="crt-quantity w-embed">
                  <input style={{paddingleft: "1rem"}} pattern="^[0-9]+$" inputMode="numeric" className="crt-quantity" type="number"  name="quantity" value={bucket.count} onChange={quantityChange(bucket.id)}   min={1} max={10} />
              </div>
          </div>
      </div>
        }
      })
    }
    </>
  )
}

export default BucketItems