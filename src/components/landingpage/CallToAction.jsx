import React from "react";
import {Button} from "antd";

const CallToAction = ({setOpenModal2}) => {
    return (<div className="cta-container">
        <h1 className="cta-title">
            It's time to sharpen your workflows! 🚀
        </h1>
        <Button type="primary" className="cta-button" onClick={() => {setOpenModal2(true)}}>
            GET STARTED
        </Button>
    </div>);
}

export default CallToAction;