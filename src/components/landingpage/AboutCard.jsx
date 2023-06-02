import React, {useEffect} from "react";
import "../../assets/styles/about_card.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ContentComp = (props) => {
    return (<div className="about-content" data-aos="fade-left">
        <div className="main-content">
            <div className="section-title">
                <h3 className="title">{props.featureTitle}</h3>
            </div>
            <p className="text">{props.featureDesc}</p>
        </div>
    </div>);
};

const ImageComp = (props) => {
    return (<div className="about-image" data-aos="fade-right">
        <div className="main-image">
            <img src={props.imgUrl} alt="feature"/>
        </div>
    </div>);
};

const AboutCard = (props) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div className="about-card-container">
            {props.imgPosition === "left"
                ? <>
                    <ContentComp {...props}/>
                    <ImageComp {...props}/>
                </>
                : <>
                    <ImageComp {...props}/>
                    <ContentComp {...props}/>
                </>}
        </div>
    );
}

export default AboutCard;
