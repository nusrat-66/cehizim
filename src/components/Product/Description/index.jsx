import React, { useState } from 'react';
export default function ProductDescription({description, features}) {
    
    const [SlctDetail, setSlctDetail] = useState("about");
    return(
        <div className="prdct-details wf-section">
            <div className="dv-wrapper">
                <div id="w-node-_6c6588b9-4033-de34-3bde-d3f9205e4028-64a99980" data-easing="ease" data-duration-in={300} data-duration-out={100} className="prdt-tabs w-tabs">
                    <div id="w-node-_6c6588b9-4033-de34-3bde-d3f9205e4029-64a99980" className="tabs-menu w-tab-menu">
                        <a className={SlctDetail === "about" ? "product-det-tab w-inline-block w-tab-link w--current" : "product-det-tab w-inline-block w-tab-link"} onClick={() => { setSlctDetail("about") }}>
                            <div className="prdt-tab-text">Məhsul haqqında</div>
                        </a>
                        <a className={SlctDetail === "details" ? "product-det-tab w-inline-block w-tab-link w--current" : "product-det-tab w-inline-block w-tab-link"} onClick={() => { setSlctDetail("details") }}>
                            <div className="prdt-tab-text">Xüsusİyyətlər</div>
                        </a>
                    </div>
                    <div className="w-tab-content">
                        <div className={SlctDetail == "about" ? "product-det-pane w-tab-pane w--tab-active" : "product-det-pane w-tab-pane"}>
                            <p className="prdct-info">
                             
                            <div dangerouslySetInnerHTML={{__html: description}}>
                             </div>
                              </p>
                        </div>
                        <div className={SlctDetail == "details" ? "product-det-pane w-tab-pane w--tab-active" : "product-det-pane w-tab-pane"}>
                            <div className="prdt-det-wrapper">
                                 <div dangerouslySetInnerHTML={{__html: features}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}