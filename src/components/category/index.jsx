import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeftIcon from '../../assets/images/arrow-left.svg';
import RightIcon from '../../assets/images/arrow-right.svg';
import ArrowIcon from '../../assets/images/bc-arrow.svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DropDownList from './dropDownList';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import agent from '../../api/agent';
import ReactPaginate from 'react-paginate';
import Items from "../Product/Main/Items";

import { useParams } from 'react-router-dom';
 
export default function ProductComp() {
const params=useParams()
 
useEffect(() => {
    window.scrollTo(0, 0)
 }, [params])
const itemsPerPage=6
  
    const categories=useSelector((state)=>state.categorieReducer)
    const [filterCategory, setFilterCategory]=useState({type:true, payload:null});
    const [minPrice, setMinPrice]=useState(null)
    const [maxPrice, setMaxPrice]=useState(null)
    const [Products, setProducts ] = useState(false);
    const [rengFilter, setRengFilter ] = useState(null);
    const [discountFilter, setDiscountFilter ] = useState(false);
    const [sortByPrice, setSortByPrice] = useState('');
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [catName, setCatName] = useState(null);
    const [subCatName, setSubCatName] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
 

 



    useEffect(async () => {
if(Products){
    const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(Products);
        setPageCount(Math.ceil(totalCount / itemsPerPage));
 }
    }, [itemOffset, itemsPerPage, Products]);
 

      const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % totalCount;
          console.log(newOffset, 'as');
       setItemOffset(newOffset);
    }

 
    const handleChange = (event) => {
        setSortByPrice(event.target.value);
    };
  

const advanceSearche=async ()=>{
   const response=await axios({
        method: "POST",
        baseURL: "https://apis.digimall.az/api/Queries/CehizimAdvanceSearch",
        headers: {
            'api-key': '620C471E-05CC-4D90-9817-B7A3EED57E1B' 
        },
        data: {
            languageId: 19,
            skip:itemOffset,
            take:6,
        }
    })
        const advancedSearch=await response.data;
          return advancedSearch
 }

    
    async function getProducts(itemOffset, take=6) {
        const advanceSearch=await advanceSearche()
         setProducts(advanceSearch);
console.log(advanceSearch, 'advanceSearch 777');
         setTotalCount(advanceSearch[0].totalCount)
     }

     useEffect(() => {
        getProducts()
    }, [])

const filter= async ()=>{
      const sortObject={
        "minPrice":minPrice,
        "maxPrice":maxPrice,
        "languageId":19,
        "skip":itemOffset,
        "take":6,
        "catId":!filterCategory.type?filterCategory.payload:null,
        "catParentId":filterCategory.type?filterCategory.payload:null,
       }

if(sortByPrice=='ucuz'){
    sortObject["sort"]="price"
    sortObject["direction"]=true
}
else if(sortByPrice=='bahali'){
    sortObject["sort"]="price"
    sortObject["direction"]=false
}
 
let advancedSearch=await agent.ProductRelated.advanceSearch(sortObject)
 advancedSearch=advancedSearch
  setProducts(advancedSearch)
 }
 
 
 useEffect(() => {
     const timer = setTimeout(async () => {
     await filter()
    }, 750);
  
    return () => {
      clearTimeout(timer);
    };
   
   }, [minPrice, maxPrice,filterCategory, sortByPrice, discountFilter, itemOffset ])
 console.log(itemOffset, 'itemOffset');
  useEffect(() => {
 if(params.cate){
  const type=params.cate.split("-")[0]
 const id=params.cate.split("-")[1]
  if(type=="cat"){
setFilterCategory({
    type:true,
    payload:parseInt(id)
})
 }else{
    setFilterCategory({
        type:false,
        payload:parseInt(id)
    })
 }
}
 }, [params.cate])
 
 
    return(
           <div className="prdct-page-title wf-section">
            <div className="dv-wrapper">
                <h1 className="product-title">Kateqoriyalar</h1>
                <div className="filter-sec-dv">
                    <div className="breadcrumbs">
                        <Link to="/" className="text-link">Ana Səhİfə</Link>
                        <img src={ArrowIcon} loading="lazy" alt="" className="arrow-icon" />
                        <a to="/mehsul" className="text-link">{catName} </a>
                      { subCatName && <img src={ArrowIcon} loading="lazy" alt="" className="arrow-icon" />}
                         <a className="text-link">{subCatName} </a>
                    </div>
                    <div className="filter">
 <div className='muiSelect muiSelect__cate'>
<Box  sx=  {{ minWidth: 120  }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Qiymətə görə </InputLabel>
        <Select    value={sortByPrice} onChange={handleChange} native defaultValue="" id="grouped-native-select" label="Grouping">
          <option aria-label="None" value="" />
          <option value={"ucuz"}>Əvvəlcə ucuz</option>
          <option value={"bahali"}>Əvvəlcə bahalı</option>
        </Select>
      </FormControl>
    </Box>
</div>
                         <div className="in-sale-block w-form">
                            <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" className="sale-form">
                                 <FormGroup>
                                   <FormControlLabel control={<Checkbox onChange={(e)=>setDiscountFilter(e.target.checked)}  />} label="Endirimdə olan " />
                                 </FormGroup>
                            </form>
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-layout-grid sidebar-layout-grid">
                    <div id="w-node-ba7b83b4-baa9-009f-e5d0-16296e3e3744-fc9d8ccc" className="left-side">

                         <div className="left-slide-h">
                            <h6 id="w-node-b9c07c25-5c4f-130a-7aac-d8bbd182763a-fc9d8ccc" className="lefts-side-h">Kateqorİyalar  </h6>
                            <a   className="filter-product w-inline-block"><img src="images/filter-search.svg" loading="lazy" alt="" /></a>
                        </div>
                        <div className="filter-module">
                            <div className="fltr-area">
                                <ul className="fltr-list">
                                     {categories.map((category)=> <DropDownList setCatName={setCatName} setSubCatName={setSubCatName} key={category.id} category={category} filterCategory={filterCategory} setFilterCategory={setFilterCategory}/>)
                                    }
                          
                                </ul>
                            </div>
                        </div>
                        <div className="sidebar-divider" />
                        <div className="left-slide-h-price">
                            <h6 id="w-node-_31e2ab80-a88e-a24f-d579-30034e4dc8ab-fc9d8ccc" className="lefts-side-h">KREDİTLİ QİYMƏT</h6>
                        </div>
                        <div id="w-node-b73e2320-c10d-96b2-b36d-6b6d3655c315-fc9d8ccc" className="price-module">
                            <div className="price-form w-form">
                                <form id="email-form-3" name="email-form-3" data-name="Email Form 3" method="get" className="price-elements">
                                    <input type="number" value={minPrice} onChange={(e)=>{setMinPrice(parseInt(e.target.value))}} className="min-price w-input"   name="minPrice"   placeholder="Min:" id="name" />
                                    <input type="number" value={maxPrice} onChange={(e)=>{setMaxPrice(parseInt(e.target.value))}} className="max-price w-input"   name="maxPrice"   placeholder="Max:" id="email-4" required />
                                    <input type="submit" defaultValue="Submit" data-wait="Please wait..." className="submit-button w-button" />
                                </form>
                                <div className="w-form-done" />
                                <div className="w-form-fail" />
                            </div>
                        </div>
             
                        <div className="filter-module">
                            <div className="fltr-area">
                                <ul className="fltr-list">
  
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-layout-grid right-side">
                            <Items currentItems={currentItems} />
                    </div>
                </div>
 
              

<div className='paginateCustom'>
 {currentItems && currentItems.length>0 && <ReactPaginate
  breakLabel="..."
  nextLabel={ <a   className="pag-right gap-l-24 w-inline-block">
  <img src={RightIcon} loading="lazy" alt="" className="wh-20" />
</a>}
  onPageChange={handlePageClick}
  pageRangeDisplayed={5}
  pageCount={pageCount}
  previousLabel={<a className="pag-left gap-r-24 w-inline-block">
  <img src={LeftIcon} loading="lazy" alt="" className="wh-20" />
</a>}
  renderOnZeroPageCount={null}
/>}

</div>
             </div>
        </div>
    );
}