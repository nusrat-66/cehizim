import TestIMG1 from '../../assets/images/test1.jpeg';
import TestIMG from '../../assets/images/test3.jpeg';
import TestIMG2 from '../../assets/images/test2.jpeg';
import TestIMG3 from '../../assets/images/test6.jpeg';
export default function InpirationComp()  {
    return(
        <div className="section wf-section">
            <div className="dv-wrapper">
                <div className="insp-heading-box">
                <div className="subtitle-ins">Pictures</div>
                <h2 className="insp-headline">Latest Pictures on my Camera Roll</h2>
                </div>
                <div className="insp-col">
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG} loading="lazy" alt="" className="image-9" />
                    <div className="insp-absolute-bg" />
                </a>
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG1} loading="lazy" alt="" className="image-9" />
                    <div className="insp-absolute-bg" />
                </a>
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG2} loading="lazy" sizes="(max-width: 479px) 45vw, (max-width: 767px) 46vw, 31vw" alt="" className="image-9" />
                    <div className="insp-absolute-bg-2" />
                </a>
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG} loading="lazy" sizes="(max-width: 479px) 45vw, (max-width: 767px) 46vw, 31vw" alt="" className="image-9" />
                    <div className="insp-absolute-bg-2" />
                </a>
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG3} loading="lazy" sizes="(max-width: 479px) 45vw, (max-width: 767px) 46vw, 31vw" alt="" className="image-9" />
                    <div className="insp-absolute-bg-2" />
                </a>
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG} loading="lazy" sizes="(max-width: 479px) 45vw, (max-width: 767px) 46vw, 31vw" alt="" className="image-9" />
                    <div className="insp-absolute-bg-3" />
                </a>
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG1} loading="lazy" sizes="(max-width: 479px) 45vw, (max-width: 767px) 46vw, 31vw" alt="" className="image-9" />
                    <div className="insp-absolute-bg-3" />
                </a>
                <a href="/ilhamlanma" className="insp-div w-inline-block">
                    <img src={TestIMG} loading="lazy" alt="" className="image-9" />
                    <div className="insp-absolute-bg-3" />
                </a>
                </div>
            </div>
        </div>
    );
}