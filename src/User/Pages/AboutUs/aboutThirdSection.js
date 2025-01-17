import React from "react";

// Images
// React Icons
import { BiEdit } from "react-icons/bi";

const AboutThirdSection = ({ sectionThird, editToggle }) => {
  return (
    <React.Fragment>
      <section className="services2">
        {location?.pathname === "/about-us/edit" && (
          <div className="edithome_icon bg-dark">
            <BiEdit
              onClick={() => editToggle(true, "section3")}
              className="text-white font-size-23"
            />
          </div>
        )}

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="flc_scr lft_sde">
                <div className="service-image">
                  <img src={sectionThird?.image1} className="img-fluid" />
                </div>
              </div>  
            </div>
            <div className="col-lg-6">
              <div className="service-content mrg_rmv">
                <h1>{sectionThird?.title}</h1>
                <p>{sectionThird?.subTitle}</p>
                <p>{sectionThird?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AboutThirdSection;
