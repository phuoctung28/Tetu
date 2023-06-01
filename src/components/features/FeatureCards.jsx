import React from "react";

function FeatureCards(props) {
  return (
    <div>
      <div className={`justify-content-${props.position}`}>
        <div class="features-width">
          <img src={props.imageUrl} alt="" className="img-icons" />
          <h5 className="py-3">
            Speed
            <br />
            Optimisation
          </h5>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus
            consectetuer turpis, suspendisse.
          </p>
          <a href="#" className="readmore-link">
            Readmore
          </a>
        </div>
      </div>
    </div>
  );
}

export default FeatureCards;
