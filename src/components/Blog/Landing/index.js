import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
var decode = require('decode-html');
export default function BlogLanding() {
    const [blogLanding, setblogLanding] = useState(false);
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: 'https://apis.digimall.az/api/Cehizim/GetBlogs?skip=0&take=100',
            headers: {
                'Content-Type': 'application/json',
                'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
            }
          })
          .then(function (response) {
               setblogLanding(response.data)
           })
          .catch(function (error) {
           });
    },[])


         return(
            <>
            { blogLanding !== false ?
            <div className="blog wf-section">
                <div className="dv-wrapper">
                    <div className="w-layout-grid blog-grid-dv">
                        <div id="w-node-_6d8671ee-db82-cd4f-126d-a0ebd08881b5-39a5ea85" className="img-block">
                            <img
                                src={ `https://ferrumcapital.s3.eu-north-1.amazonaws.com${blogLanding[0]["imageUrl"]}` }
                                loading="lazy"
                                id="w-node-_268dd89a-8253-6a28-6c3b-f44f0bd2d79f-39a5ea85"
                                alt=""
                                className="image-2"
                            />
                        </div>
                        <div id="w-node-f1f6afe2-bf16-97b8-ae4f-3e28dc5af304-39a5ea85" className="beside-text">
                            
                            <div className="beside-cont">
                                <div className='beside-cont_oto'>
                                <h2 className="blog-heading">{decode(blogLanding[0]["title"]) }</h2>
                           { blogLanding[0]["description"] && <div id="w-node-_5e7836f3-f5af-d564-3641-0b6cdf6fe349-39a5ea85" className="text-block" dangerouslySetInnerHTML={{__html: decode(blogLanding[0]["description"])}}>
                                 </div>}
                                 </div>
                                 <Link to={"/blog/"+blogLanding[0]['id']} className="btn-blog-area-2 w-inline-block">
                                    <div className="btn-slide-2">DAVAMI </div>
                                    <div className="btn-growing-div" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <></>
            }
            </>
        );
}