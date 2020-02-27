import React, { Component } from 'react';
import './index.css';
import './index.scss';
import { Skeleton, Spin } from 'antd';


class Loader extends Component {

    render() {
        return (
            <div>
                <Spin className="drawing"/>
            </div>

            // <div class="loader">
            //     <div class="dot"></div>
            //     <div class="dot"></div>
            //     <div class="dot"></div>
            // </div>
        )
    }
}

export default Loader;
