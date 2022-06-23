import React, {useState, useEffect} from 'react';
import {publicLinks} from '../../../App';
import {Link} from 'react-router-dom';
const axios = require('axios');
export default function NavigationBar() {
    const [catData, setCatData] = useState();
    const [isShown, setIsShown] = useState(false);
    
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
    
    return(
        <div className="nav-navigation mt-navbar">
            <div className="dv-nav-wrapper">
                <div className="nav-flex">
                    <div className="row-menu">
                        <div className="nav-menu-wrap">
                                {catData &&
                                catData.map((index, key) =>
                                        <div data-hover="true" data-delay={0} className="nav-link nav-link-cs w-dropdown" key={key} onMouseEnter={() => setIsShown(index.id)} onMouseLeave={() => setIsShown(false)}>
                                            <div className="dp-toogle w-dropdown-toggle" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                                             <Link style={{textDecoration:"none"}} to={`/category/cat-${index.id}`}>   <div className="text-sm uppr-sm">{index.name}</div></Link>
                                            </div>
                                              <nav className={isShown === index.id ? "dp-list w-dropdown-list" : "cs-dropdown-close"}>
                                                <div className="dv-wrapper dp">
                                                    <div className="w-layout-grid dp-grid">
                                                        <div id="w-node-cbc0b599-b523-719d-7d8d-241bc5a2a70d-c5a2a701" className="dp-category">
                                                            <div className="dp-category-h"><img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620bf630df2e0f6fa4fb59e5_bedroom.svg" loading="lazy" alt="" className="wh-24 gap-l-12" />
                                                            <Link style={{textDecoration:"none"}} to={`/category/cat-${index.id}`}>
                                                                <a id="w-node-_82b95ddb-5cb1-07e9-499d-babad4a0eb72-c5a2a701"  className="text-sm uppr-sm f-w-600" tabIndex={0}>{index.name}</a>
                                                            </Link>
                                                            </div>
                                                            <div className="dp-category-list">
                                                                <ul role="list" className="dp-list-name">
                                                                    {
                                                                        index.subCategories.map((v, k) => {
                                                                            return <Link key={k} style={{textDecoration:"none"}} to={`/category/sub-${v.id}`}> <li  className="list-item gap-b-16 text-base f-w-300"> <a href="" className="list-name" tabIndex={0}>{v.name}</a></li></Link>
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="w-layout-grid dp-grid-img">
                                                            <a href="" className="dp-product w-inline-block" tabIndex={0}>
                                                                <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620bfea935b2441433ddd9e0_Chanel%20yataq%20d%C9%99sti.png" loading="lazy" alt="" className="dp-product-img" />
                                                            </a>
                                                            <a href="" className="dp-product w-inline-block" tabIndex={0}>
                                                                <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620bfea935b2441433ddd9e0_Chanel%20yataq%20d%C9%99sti.png" loading="lazy" alt="" className="dp-product-img" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </nav>



                                        </div>
                                    )
                             }
                        </div>
                        <div className="right-row">
                            <div className="row-menu-dvr" />
                            <div className="inspiration">
                                <Link to="/ilhamlanma" className="nav-link-insp insp">İlhamlan</Link> <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620b7e25b9697492a1519018_line.svg" loading="lazy" alt="" className="insp-line" /> </div>

                            <Link to="/endirimler"  className="sale text-sm w-inline-block">
                                <div className="sale-text">Endİrİmlər </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}