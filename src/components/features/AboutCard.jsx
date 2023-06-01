import React, { useEffect } from "react";
import "./AboutCard.css";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutCard(props) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  if (props.imgPosition === "left") {
    return (
      <div>
        <div className="about-card-container">
          <div className="about-content" data-aos="fade-left">
            <div className="main-content">
              <div className="section-title">
                <div className="line"></div>
                <h3 className="title">
                  <span>lorems </span>ksjdfaksdjfaksjdfasdhfkasdf
                </h3>
              </div>
              <p className="text">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                amet, consetetur sadipscing.
              </p>
              <a href="#" className="main-btn">
                Try it here
              </a>
            </div>
          </div>
          <div className="about-image" data-aos="fade-right">
            <div className="main-image">
              <img src={props.imgUrl}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="about-card-container">
        <div className="about-image" data-aos="fade-left">
          <div className="main-image">
            <img src={props.imgUrl}></img>
          </div>
        </div>
        <div className="about-content" data-aos="fade-right">
          <div className="main-content">
            <div className="section-title">
              <div className="line"></div>
              <h3 className="title">
                <span>lorems </span>ksjdfaksdjfaksjdfasdhfkasdf
              </h3>
            </div>
            <p className="text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, seiam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing.
            </p>
            <a href="#" className="main-btn">
              Try it here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
