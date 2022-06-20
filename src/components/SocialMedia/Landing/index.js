import React from 'react';
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";
import { Link } from "react-router-dom";
export default function SocialMediaLanding() {
    return(
        <div className="social-media wf-section">
            <div className="dv-wrapper">
                <div id="w-node-_7b5ae974-a4c8-e4fc-5507-e353eb17cbe6-eb17cbe4" className="sc-text-center">
                    <h2 id="w-node-_7b5ae974-a4c8-e4fc-5507-e353eb17cbe7-eb17cbe4" className="ins-heading">Məqsədli Dizayn, Rahat Yaşayış</h2>
                    <a href="https://www.instagram.com/cehizimaz/" target="_blank" rel="noopener noreferrer" className="social__link gap-r-24 w-inline-block">@cehizimaz</a>
                </div>
            </div>
            <div className="w-layout-grid social-grid social-grid-insta-feed">
            <InstagramFeed
                token="IGQVJWcWx2bHV5ZAy02MWlnRy1uWUJ1LWxmLWZAfNHNUaHlCTVBYSURpVzJ1eXptTEdmSjJmemhEbVVTWGFUR0RqTmRMY0R0NmpaYlA1Ry03X2wtMjZA5SmFyb2hNeEZAzVGlJcjhFb3ZAfekYwSzhUckhfSgZDZD"
                counter="10"
            />
                
            </div>
        </div>
    );
}