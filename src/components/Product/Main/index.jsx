import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '../../../assets/images/add.svg';
import HeartIcon from '../../../assets/images/heart.svg';
import redHeart from "../../../assets/images/redHeart.svg"
 import LeftIcon from '../../../assets/images/arrow-left.svg';
import RightIcon from '../../../assets/images/arrow-right.svg';
import ArrowIcon from '../../../assets/images/bc-arrow.svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addWishListStorage, deleteWishListStorage } from "../../../redux/actions"
import DropDownList from './dropdownList';
import RengDropDown from "./rengDropDown"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import agent from '../../../api/agent';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import Items from "./Items"
  

 
 export default function ProductComp() {
const itemsPerPage=6
const params=useParams()
useEffect(() => {
    window.scrollTo(0, 0)
 }, [params])
 
     const categories=useSelector((state)=>state.categorieReducer)
 
    const [filterCategory, setFilterCategory]=useState({type:true, payload:null});
    const [minPrice, setMinPrice]=useState(null)
    const [maxPrice, setMaxPrice]=useState(null)
    const [ Products, setProducts ] = useState(false);
    const [ rengFilter, setRengFilter ] = useState(null);
    const [ discountFilter, setDiscountFilter ] = useState(false);
    const [sortByPrice, setSortByPrice] = useState('');

 


    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
   
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
 if(typeof Products=="object"){
       const endOffset = itemOffset + itemsPerPage;
       setCurrentItems(Products.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(Products.length / itemsPerPage));

}
    }, [itemOffset, itemsPerPage, Products]);
  
     const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % Products.length;
       setItemOffset(newOffset);
    }
  
    
     const handleChange = (event) => {
        setSortByPrice(event.target.value);
    };
  
     function getProducts() {
        axios({
            method: "POST",
            baseURL: "https://apis.digimall.az/api/Queries/CehizimAdvanceSearch",
            headers: {
                'api-key': '620C471E-05CC-4D90-9817-B7A3EED57E1B' 
            },
            data: {
                languageId: 19,
                skip: 0,
                take: 100,
            }
        }).then(function(response) {
           const advancedSearch=response.data.map((index)=>{
            const mock=index
           if(index.creditSettingMonth.length>0){
            return index;
        }
             else {
                 categories.forEach((category)=>{
                     if(category.id==index.catParentId){
                        const mock=index
                        mock.creditSettingMonth=category.creditSetting.creditSettingMonth
                    }
                })
                return mock
            }
            }) 

            setProducts(advancedSearch);
         })
    }
    useEffect(() => {
        getProducts()
    }, [])

const filter= async ()=>{

    const sortObject={
        "minPrice":minPrice,
        "maxPrice":maxPrice,
        "languageId":19,
        "skip":0,
        "take":10000,
        "catId":filterCategory.type?filterCategory.payload:null,
        "catParentId":!filterCategory.type?filterCategory.payload:null,
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
 advancedSearch=advancedSearch.map((index)=>{
    const mock=index
    if(index.creditSettingMonth.length>0){
    return index;
}
     else {
         categories.forEach((category)=>{
             if(category.id==index.catParentId)  {
                 const mock=index
                 mock.creditSettingMonth=category.creditSetting.creditSettingMonth
            }
        })
        return mock
    }
    }) 
  setProducts(advancedSearch)
  }
  
 useEffect(() => {
     const timer = setTimeout(async () => {
     await filter()
    }, 750);
  
    return () => {
      clearTimeout(timer);
    };
    }, [minPrice, maxPrice,filterCategory, sortByPrice, discountFilter, categories])
console.log(Products, 'produtsss');
    return(
           <div className="prdct-page-title wf-section">
            <div className="dv-wrapper">
                 <div className="filter-sec-dv">
                    <div className="breadcrumbs">
                        <Link to="/" className="text-link">Ana Səhİfə</Link>
                        <img src={ArrowIcon} loading="lazy" alt="" className="arrow-icon" />
                        <Link to="/mehsul" className="text-link">Məhsullar</Link>
                      </div>
                    <div className="filter">
 <div className='muiSelect'>
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
                                   <FormControlLabel control={<Checkbox onChange={(e)=>setDiscountFilter(e.target.checked)}  />} label="Endirimdə olan" />
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
                                    
                                    {categories.map((category)=> <DropDownList key={category.id} category={category} filterCategory={filterCategory} setFilterCategory={setFilterCategory}/>)
                                    }
                          
                                </ul>
                            </div>
                        </div>
                        <div className="sidebar-divider" />
                        <div className="left-slide-h-price">
                            <h6 id="w-node-_31e2ab80-a88e-a24f-d579-30034e4dc8ab-fc9d8ccc" className="lefts-side-h">QİYMƏT</h6>
                        </div>
                        <div id="w-node-b73e2320-c10d-96b2-b36d-6b6d3655c315-fc9d8ccc" className="price-module">
                            <div className="price-form w-form">
                                <form id="email-form-3" name="email-form-3" data-name="Email Form 3" method="get" className="price-elements">
                                    <input type="number" value={minPrice} onChange={(e)=>{setMinPrice(parseInt(e.target.value))}} className="min-price w-input"   name="minPrice"   placeholder="Min:" id="name" />
                                    <input type="number" value={maxPrice} onChange={(e)=>{setMaxPrice(parseInt(e.target.value));filter()}} className="max-price w-input"   name="maxPrice"   placeholder="Max:" id="email-4" required />
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
  <ReactPaginate
  breakLabel="..."
  nextLabel={ <a  className="pag-right gap-l-24 w-inline-block">
  <img src={RightIcon} loading="lazy" alt="" className="wh-20" />
</a>}
  onPageChange={handlePageClick}
  pageRangeDisplayed={5}
  pageCount={pageCount}
  previousLabel={<a  className="pag-left gap-r-24 w-inline-block">
  <img src={LeftIcon} loading="lazy" alt="" className="wh-20" />
</a>}
  renderOnZeroPageCount={null}
/>

</div>


 
            </div>
        </div>
    );
}