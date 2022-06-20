import React, { useEffect, useState } from 'react';
import {publicLinks} from '../../../App';
import { Link } from "react-router-dom";
import axios from 'axios';
var decode = require('decode-html');
export default function HeroSlider() {

    const [HeroData, setHeroData] = useState(false);
    const [LastHeroCount, setLastHero] = useState(0);
    var preLoaderStyle = {
        display: "flex"
    };
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: 'https://apis.digimall.az/api/Cehizim/GetSliders',
            headers: {
                'Content-Type' : 'application/json',
                'api-key' : '620C471E-05CC-4D90-9817-B7A3EED57E1B'
            }
        }).then(function (response) {
            setHeroData(response.data)
        });
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if(LastHeroCount === HeroData.length - 1) {
                setLastHero(0)
            }
            else {
                setLastHero(LastHeroCount => LastHeroCount+1 )
            }
        }, 3000);
        return () => {
          clearTimeout(timer);
        };
      }, [LastHeroCount]);

    return(
        <>
        {!HeroData &&
            <div id="preloader" style={preLoaderStyle} className="sc-AykKC ceHfpt">
                <div className="sc-AykKH gNkidG"><span></span></div><div className="preloader-text">Yüklənir...</div>
            </div>
        }

        {HeroData &&
        HeroData.map((index, key) =>
        <div className={`hero-slider wf-section ${key !== LastHeroCount && `disable-slide-element`} `} Style={`background-color: ${HeroData[key]?.rectangleColor } ;`}>
            <div className="w-layout-grid hero-grid">
             {   <div id="w-node-bf980d3e-df69-3278-3bda-2a5fa6247eef-39a5ea85" className="hero-right bg-color" Style={`background-color: ${HeroData[key]?.rectangleColor};`}>
                    <div className="content-row">
                        <h1 className="slider-main-text" dangerouslySetInnerHTML={{__html: decode(HeroData[key]?.title)}}></h1>
                        <div className="slider-desc" dangerouslySetInnerHTML={{__html: decode(HeroData[key]?.description)}}></div>
                        <Link to={publicLinks.product} className="btn-slide-area w-inline-block">
                            <div className="btn-slide" Style={`color: ${HeroData[key].buttons[0].color}; background-color: ${HeroData[key].background};`}>{HeroData[key].buttons[0].title}</div>
                        </Link>
                    </div>
                </div>}
                <img
                    src={'https://cdn.otomall.az/' + HeroData[key].imageUrl}
                    loading="lazy"
                    sizes="100vw"
                    id="w-node-abeb76eb-7d1a-400d-5d62-f2c117a903e3-39a5ea85"alt=""
                    className="hero-image"
                />
            </div>
        </div>
        )
        }
        </>
    )
}