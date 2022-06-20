import React, { Component } from 'react';
import {publicLinks} from '../../../App';
import Stories from "./stories"


class Story extends React.Component{
    render() {
        return(
            <div className="dv-wrapper">
                <div className="story">
                    <div className="w-layout-grid story-grid">
                <Stories/>
                      </div>
                </div>
            </div>

        )
    }
}
export default Story;