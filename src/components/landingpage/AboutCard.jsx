import React, {useEffect} from "react";
import "../../assets/styles/about_card.css";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutCard(props) {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    if (props.imgPosition === "left") {
        return (<div>
                <div className="about-card-container">
                    <div className="about-content" data-aos="fade-left">
                        <div className="main-content">
                            <div className="section-title">
                                <h3 className="title">
                                    {props.featureTitle}
                                </h3>
                            </div>
                            <p className="text">
                                {props.featureDesc}
                            </p>
                        </div>
                    </div>
                    <div className="about-image" data-aos="fade-right">
                        <div className="main-image">
                            <img src={props.imgUrl} alt="feature"></img>
                        </div>
                    </div>
                </div>
            </div>);
    }
    return (<div>
            <div className="about-card-container">
                <div className="about-image" data-aos="fade-left">
                    <div className="main-image">
                        <img src={props.imgUrl} alt="feature"></img>
                    </div>
                </div>
                <div className="about-content" data-aos="fade-right">
                    <div className="main-content">
                        <div className="section-title">
                            <div className="line"></div>
                            <h3 className="title">
                                {props.featureTitle}
                            </h3>
                        </div>
                        <p className="text">
                            {props.featureDesc}
                        </p>
                    </div>
                </div>
            </div>
        </div>);
}

export default AboutCard;
