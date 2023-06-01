import React , { useEffect }from 'react'
import './CaseStudyCard.css'
import AOS from "aos";
import "aos/dist/aos.css";

function CaseStudyCard(props) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    
      <div className="card-container">
        <div className="card color-cards" data-aos="zoom-in" >
          <div className="card-body">
            <div className="bg-primary text-center card-contents">
              <div className="card-image">
                <img
                  src={props.imageUrl}
                  className="case-studies-card-img"
                  alt=""
                />
              </div>
              <div className="card-desc-box d-flex align-items-center justify-content-around">
                <div>
                  <h6 className="text-white pb-2 px-3">
                    Know more about Online marketing
                  </h6>
                  <button className="btn btn-white">Read More</button>
                </div>
              </div>
            </div>
            <div className="card-details text-center pt-4">
              <span className="detail-headline">Online Marketing</span>
              <p>Seo, Marketing</p>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default CaseStudyCard