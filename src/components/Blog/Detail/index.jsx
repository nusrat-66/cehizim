
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/az';
var decode = require('decode-html');

export default function ReadBlogComp() {
    let params = useParams();
    const [blogDetails, setBlogDetails] = useState(false);
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: `https://apis.digimall.az/api/Cehizim/GetBlogsById?id=${params.blogAdi}`,
            headers: {
                'Content-Type': 'application/json',
                'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
            }
          })
          .then(function (response) {
              console.log(response.data);
              setBlogDetails(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    },[])
    return(
        <>
        {
            blogDetails !== false ? 
            <div className="blog-sec wf-section">
                <div className="dv-wrapper">
                    <div className="article-wrapper">
                    <div className="title-sec">
                        <div className="text-block-15"><Moment format="DD MMM YYYY HH:mm" locale="az">{blogDetails.createAt}</Moment></div>
                        <h3 className="blog-content-head">{blogDetails.title} <br />
                        </h3>
                    </div>
                    <div className="article-image">
                        <img
                        src={ `https://ferrumcapital.s3.eu-north-1.amazonaws.com${blogDetails["imageUrl"]}` }
                        loading="lazy"
                        alt={blogDetails.blogAdi} />
                    </div>
                    <div className="article-body">
                        <div className="text-block-14" dangerouslySetInnerHTML={{__html:decode(blogDetails.description)}}></div>
                    </div>
                    </div>
                </div>
            </div>
            :<></>
        }
        </>
    )
}