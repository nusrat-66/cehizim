 
import React, {useState, useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom";
export default function CampaignsAlotComp() {
    const [campaignShortContext, setCampaignShortContext] = useState([]);
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


    
    return(
<div className="campaign-list wf-section">
    <div className="dv-wrapper">
      <div className="w-layout-grid campaing-grid"> { campaignShortContext.map(camp=>{ if(camp.position==0){
        return <Link id="w-node-fd6d2081-98f7-117f-38b5-f9bb069c763a-a57ae80c" to={"/kampaniya/"+camp.id} className="left-campgn w-inline-block">
          <img src={"https://cdn.otomall.az/"+camp.imageUrl} loading="lazy" sizes="100vw" alt="" className="left-ads-img" />
        </Link> }
        else
        { return <div id="w-node-fd6d2081-98f7-117f-38b5-f9bb069c763c-a57ae80c" className="right-campgn">
          <div className="right-1">
          <Link to={"/kampaniya/"+camp.id}>
          <img src={"https://cdn.otomall.az/"+camp.imageUrl} loading="lazy" sizes="100vw" alt="" />
          </Link>  
          </div>
        </div> } }) } 
        </div>
    </div>
  </div>
    )
}