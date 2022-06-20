import React, { useState } from 'react';
import announceLogo from '../../../assets/images/icon-cross.svg';
export default function Announce() {
    const [isActiveNonc, setNonce] = useState(false);
    return (
        <div className={isActiveNonc === true ? "annonce" : "annonce-disabled"}>
            <div className="dv-wrapper">
                <div className="announce-cnt text-sm">
                    <div className="announce-text">Bütün mebel və sİfarİşlərİnİzə 20% endİrİm</div>
                    <div className="announce-close">
                        <img src={announceLogo} loading="lazy" alt="" className="announce-icon" onClick={() => setNonce(false)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
