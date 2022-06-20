import React, { useEffect, useState } from 'react';
import {publicLinks} from '../../../App';
import closeBtnImg from '../../../assets/images/x-button.svg';
import CookieIcon from '../../../assets/images/cookie-icon.svg';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Cookie() {
    const [displayCookie, setdisplayCookie] = useState(true);
    var CookieSet = cookies.get('CookiesAccept');
    function DisableCookie() {
        cookies.set('CookiesAccept', "cookie-wrapper");
        setdisplayCookie(false);
    }
    return(
        <>
        {displayCookie === true ? 
            <div className={CookieSet === undefined ? "cookie-wrapper" : "cookie-wrapper-disabled"}>
                <div className="cookie-banner-wrapper">
                    <div className="cookie-banner-content">
                        <h6 className="cookie-heading">Our website uses cookies</h6>
                        <p className="paragraph-4">Our website use cookies. By continuing, we assume your permission to deploy cookies as detailed in our <a href={publicLinks.login}>Privacy Policy.</a></p>
                        <button type="button" className="button-sm accept-cookie-button w-inline-block" onClick={() => DisableCookie()}>
                            <img src={CookieIcon} loading="lazy" alt="" className="cookie-icon wh-24" />
                            <div className="text-block-11">Accept Cookies</div>
                        </button>
                        <img src={closeBtnImg} loading="lazy" alt="" className="close-icon wh-16" onClick={() => DisableCookie()}/>
                    </div>
                </div>
            </div> : <></>
        }
        </>
    )
}
