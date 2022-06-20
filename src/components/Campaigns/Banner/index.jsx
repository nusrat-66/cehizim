import ExampleBannerIMG from '../../../assets/images/banner.png';



 

export default function CampaignBannerComp({imageUrl, error}) {
 
    return(
         <div className="campaign-banner-section wf-section">
            <div className="dv-wrapper">
               {error && <div className='errorCampaign'> <p>{error}</p> </div>}
                <div className="ads-banner-full-div">
                <img src={imageUrl} loading="lazy" sizes="(max-width: 479px) 87vw, (max-width: 767px) 94vw, 95vw" alt="" className="ads-banner-full" />
                 </div>
            </div>
        </div>
    )
};