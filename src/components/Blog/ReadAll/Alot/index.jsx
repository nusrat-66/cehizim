import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Moment from 'react-moment';
import 'moment/locale/az';
import '../../../../assets/styles/yeni.css';
export default function BlogAlot() {
    const [blogDataAll, setblogDataAll] = useState(false);
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
              setblogDataAll(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    },[])
    return(
        <div className="blogs-first wf-section">
            <div className="dv-wrapper">
                <h1 className="blog-read-head">Daha çox oxunanlar</h1>
                <div className="blog-div">
                    <div className="blogs-grid">
                        {
                            blogDataAll !== false ?
                            blogDataAll.map((index, key) =>
                                <a href={'/blog/' + index.id} className="blog-link w-inline-block" key={key}>
                                    <div className="blog-image-div">
                                        <img src={'//cdn.otomall.az/' + index.imageUrl} loading="lazy" alt="" className="blog-image blog-image-cs" />
                                    </div>
                                    <div className="date text-sm"><Moment format="DD MMM YYYY HH:mm" locale="az">{index.createAt}</Moment></div>
                                    <h3 className="blog-post-head">{index.title}</h3>
                                </a>
                            )
                            :<></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}