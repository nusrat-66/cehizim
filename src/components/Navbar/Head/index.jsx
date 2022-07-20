import React, { useState, useRef, useEffect, useReducer } from 'react';
import {publicLinks} from '../../../App';
import cehizim_nav_logo from '../../../assets/images/cehizim-logo-nav.svg';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 export default function Navbar() {
  const [MenuMobile, setMenuMobile] = useState(false);
  const [ActiveSubCat, setActiveSubCat] = useState();
  const [SearchBar, setSearchBar] = useState(false);
  const SearchinputRef = useRef();
  const navigate = useNavigate();
const params=useParams()
const {buckets, notification}=useSelector(state=>state)
const {wishList}=useSelector(state=>state)



const notiCount=notification.reduce(
  (previousValue, currentValue) => {
    if(!currentValue.view){
     return previousValue + 1
  }
    },
  0
)
console.log(notiCount, 'notiCounttt');
   useEffect(() => {
    (SearchBar) ? SearchinputRef.current.focus() : SearchinputRef.current.blur();
  }, [SearchBar]);

  function ToggleSubCat(page_name) {
    (ActiveSubCat === page_name) ? setActiveSubCat(false) : setActiveSubCat(page_name)
  }
  function openCartModal() {
    document.getElementById("BucketLive").style.display = "block";
  }
  function openWishModal() {
    document.getElementById("Wishlist").style.display = "block";
  }
  function SearchBarButton() {
    (SearchBar === true) ? setSearchBar(false) : setSearchBar(true)
  }
  const [catData, setCatData] = useState();

const onSearchFunc=(e)=>{
  const value=e.target.value
if(e.keyCode==13){
navigate(`/axtarish/${value}`)
}
}
 useEffect(() => {
  setMenuMobile(false)
}, [params])

  useEffect(() => {
      axios({
          method: "GET",
          baseURL: "https://apis.digimall.az/api/Cehizim/GetCategoriesWithCreditSettings",
          headers: {
              'Content-Type': 'application/json',
              'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
          },
      }).then( function(response) {
        setCatData(response.data);
      });
  }, []);
  useEffect(() => {
   }, [catData]);
  //catDat
  return (
    <div className="navigation">
      <div className="dv-wrapper">
        <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
          <div className="navigation-cnt">
            <a href={publicLinks.main} className="logo w-nav-brand">
              <img src={cehizim_nav_logo} loading="lazy" id="w-node-_51db83f9-120a-193a-30c9-30ab9ebaa39a-9ebaa395" alt="" className="cehizim-logo" />
            </a>
            <div className="navbar-4x-icon">
              <div className={SearchBar === true ? "mod-web-search mod-web-search-active" : "mod-web-search"}>
                <div className="blok-search">
                  <div className="search-input">
                    <form action="/search" className="search-flds">
                        <input onKeyDown={onSearchFunc}   ref={SearchinputRef} className="search-inpt w-input" maxLength={256} name="searchquery" placeholder="İstədiyiniz məhsulu axtarış edin" required />
                      <input  defaultValue="Search" className="search-button" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="search wh-24 gap-r-24" onClick={() => { SearchBarButton() }}>
                { SearchBar ?
                    <div className='btn-animation'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21L21.0004 3" stroke="#292D32" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.987 20.9875L3.01855 3.01953" stroke="#292D32" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 22L20 20" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
              </div>

              <div className="profilWrapper">
              <Link id="w-node-_51db83f9-120a-193a-30c9-30ab9ebaa39e-9ebaa395" to={publicLinks.login} className="profile wh-24 gap-r-24 w-inline-block">
                <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620ab95a0f0faa2dc54c1c0c_profile.svg" loading="lazy" alt="" className="avatar" />
               </Link>
            { notiCount &&  <div className="profilNotification">
                {notiCount}
               </div>}
               </div>
              


              <div id="w-node-_51db83f9-120a-193a-30c9-30ab9ebaa3a0-9ebaa395" onClick={openWishModal} className="love wh-24 gap-r-24 w-inline-block">
                {
                wishList.length>0 && 
                <div className="notifi-badge-wishlist-cs">
                  <div className="number">{wishList.length}</div>
                </div>
                }
                <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620ab9f0658a411453503a5d_whishlist.svg" loading="lazy" alt="" className="cart-icon wh-24" />
              </div>
              <div className="cart wh-24" onClick={openCartModal}>




            {  buckets.length>0 && <div className="notifi-badge">
                  <div className="number">{buckets.length}</div>
                </div>}
 
                
                <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/6214a9cabec7b2adcb086a84_bag-2.svg" loading="lazy" alt="" className="cart-icon"/>
              </div>
              <div className="hamburger wh-24 gap-l-24" onClick={() => setMenuMobile(!MenuMobile)}>
                <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620b41b8bf004526086ca93e_menu-icon.svg" loading="lazy" alt="" className="menu-icon wh-24" />
                </div>
            </div>
          </div>
          <div className="mod-search">
            <div className="blok-search">
              <div className="search-input"><img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620ab8c06e16612a3ecfd112_search.svg" loading="lazy" alt="" className="search-icon wh-20" />
                <form onSubmit={e=>e.preventDefault()} action="/search" className="search-flds w-form">
                  <input onKeyUp={onSearchFunc} type="search" className="search-inpt w-input" maxLength={256} name="query" placeholder="İstədiyiniz məhsulu axtarış edin" id="search-2" required />
                  <input type="submit" defaultValue="Search" className="search-button w-button" />
                </form>
              </div>
            </div>
          </div>
          <div className="w-nav-overlay" data-wf-ignore id="w-nav-overlay-0" /></div>
      </div>
      <div className={MenuMobile ? "mobile-menu mobile-menu-active" : "mobile-menu"}>
        <div className="dv-wrapper">
          <div className="m-menu-cnt">
            <ul role="list" className="list-menu">
              { catData && catData.map((index, key) =>
                  <li className="item-list" key={key}>
                    <div className="mobile-dp w-dropdown">
                      <div className="dp-toggle text-sm uppr-sm w-dropdown-toggle" role="button" >
                      <Link style={{textDecoration:"none"}} to={`/category/cat-${index.id}`}> <div className="dp-text">{index.name}</div></Link>
                        <div onClick={() => ToggleSubCat(index.id)} className={ActiveSubCat === index.id ? "wh-24 ExpandBtn SubCategoryExpanded" : "wh-24 ExpandBtn"} loading="lazy">
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.43848 12.5469H18.8132" stroke="#383838" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.626 18.5469V6.54688" stroke="#383838" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <nav className={ActiveSubCat === index.id ? "dropdown-list w-dropdown-list subCatItems active-sub-cat" : "dropdown-list w-dropdown-list subCatItems"}>
                        {
                          index.subCategories.map((v, k) => {
                            return <Link key={k} style={{textDecoration:"none"}} to={`/category/sub-${v.id}`}  className="item-dp-list text-sm w-dropdown-link" tabIndex={0}>{v.name}</Link>
                          })
                        }
                      </nav>
                    </div>
                  </li>
                )
               }
              <li className="item-list">
                <div className="ins-item text-sm">
                  <div className="dp-text _w-f-700">İLHAMLANMA</div>
                </div>
              </li>
              <li className="item-list">
                <div className="in-sale text-sm">
                  <div className="dp-text _w-f-700">ENDİRİMLƏR</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};
