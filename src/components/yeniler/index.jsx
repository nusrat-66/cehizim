import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
import LeftIcon from '../../assets/images/arrow-left.svg';
import RightIcon from '../../assets/images/arrow-right.svg';
import ArrowIcon from '../../assets/images/bc-arrow.svg';
 import ReactPaginate from 'react-paginate';
import Items from "./items";
import { useParams } from 'react-router-dom';
  import agent from "../../api/agent"
export default function ProductComp() {
const params=useParams()
 
 useEffect(() => {
    window.scrollTo(0, 0)
 }, [params])
const itemsPerPage=6
  
 
   
    const [ Products, setProducts ] = useState(false);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [title, setTitle] = useState("");
  
    useEffect(() => {
if(Products){
       const endOffset = itemOffset + itemsPerPage;
       setCurrentItems(Products.slice(itemOffset, endOffset));
       setPageCount(Math.ceil(Products.length / itemsPerPage));
 }
    }, [itemOffset, itemsPerPage, Products]);
  
     const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % Products.length;
       setItemOffset(newOffset);
    }
 
     const getProducts=async ()=> {
          const productResponse=await agent.CampaniyaRelated.getNewest(params.id)
              const  advancedSearch=productResponse.productDetails 
              setTitle(productResponse.title)
            setProducts(advancedSearch);
     }
    useEffect(() => {
        getProducts()
    }, [params])
 
    return(
           <div className="prdct-page-title wf-section">
            <div className="dv-wrapper">
                 <div className="filter-sec-dv">
                    <div className="breadcrumbs">
                        <Link to="/" className="text-link">Ana Səhİfə</Link>
                        <img src={ArrowIcon} loading="lazy" alt="" className="arrow-icon" />
                        <Link to="/mehsul" className="text-link">{title}</Link>
                    </div>
                    <div className="filter">

                         <div className="in-sale-block w-form">
                       
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-layout-grid sidebar-layout-grid sidebar-layout-grid__sp">
                     <div className="w-layout-grid right-side">
                          <Items currentItems={currentItems} />
                    </div>
                </div>
 
              

<div className='paginateCustom'>
{Products && <ReactPaginate
  breakLabel="..."
  nextLabel={ <a   className="pag-right gap-l-24 w-inline-block">
  <img src={RightIcon} loading="lazy" alt="" className="wh-20" />
</a>}
  onPageChange={handlePageClick}
  pageRangeDisplayed={5}
  pageCount={pageCount}
  previousLabel={<a   className="pag-left gap-r-24 w-inline-block">
  <img src={LeftIcon} loading="lazy" alt="" className="wh-20" />
</a>}
  renderOnZeroPageCount={null}
/>}
 </div>






            </div>
        </div>
    );
}