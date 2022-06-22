import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Newest from "../Newest/index"
import { Link } from "react-router-dom";
function CampaignMain() {
    const [campaignShortContext, setCampaignShortContext] = useState(false);
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: 'https://apis.digimall.az/api/Products/GetCampaigns?valid=true',
            headers: {
                'Content-Type': 'application/json',
                'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
            }
        }).then(function (response) {
            setCampaignShortContext(response.data)
        });
    }, [])

    return (
        <div className="camp-list wf-section">
            <div className="dv-wrapper">
                <div id="w-node-_2e12d77d-8bc6-c5f6-5e60-6cbd75f84742-39a5ea85" className="campgn-heading-text">
                    <h3 className="section-title">Kampaniyalar</h3>
                    <a href="/kampaniyalar" className="more-btn w-inline-block">
                        <div className="more-text">
                            <div className="see-mr">DAHA ÇOX</div>
                            <img src="https://assets.website-files.com/620a985e7541fc8c1ca5ea83/620e341e0ecefe5d8342063c_arrow.svg" loading="lazy" alt="" className="see-more-icon" />
                        </div>
                    </a>
                </div>
                {campaignShortContext ? 
                <div className="w-layout-grid campgn-grid">
                    <Link id="w-node-_84e87108-37e1-2c9f-b928-049210ad914b-39a5ea85" to={"/kampaniya/"+campaignShortContext[0].id} className="left-campgn w-inline-block">
                        <img
                            src={'https://cdn.otomall.az/'+campaignShortContext[0].imageUrl}
                            loading="lazy"
                            alt=""
                            className="camp-img"
                        />
                    </Link>
                    <Link id="w-node-_58c2bda3-7759-760d-9a8c-6d60b974a9ea-39a5ea85" to={"/kampaniya/"+campaignShortContext[1].id} className="right-campgn">
                        <div className="right-1">
                            <img
                                src={'https://cdn.otomall.az/'+campaignShortContext[1].imageUrl}
                                Style={"width: 100%; height: 100%; max-height: 203px;"}
                                loading="lazy"
                                alt=""
                            />
                        </div>
                    </Link>
                    <Link id="w-node-_329df5ab-6f9a-c687-aa15-22ff975a695c-39a5ea85" to={"/kampaniya/"+campaignShortContext[2]?.id} className="right-campgn">
                        <div className="right-2">
                            <img
                                src={'https://cdn.otomall.az/'+campaignShortContext[2].imageUrl}
                                Style={"width: 100%; height: 100%; max-height: 203px;"}
                                loading="lazy"
                                alt=""
                            />
                        </div>
                    </Link>
                </div>
                : <></>}
                 <Newest/>
            </div>
        </div>
    )
}
export default CampaignMain;