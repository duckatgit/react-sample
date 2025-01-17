import React from "react";

// React Icons & Images
import { BiEdit } from "react-icons/bi";

const AboutSecondSection = ({ sectionSecond, editToggle }) => {
  return (
    <React.Fragment>
      <section className="services">
      {location?.pathname === "/about-us/edit" && (
          <div className="edithome_icon bg-dark">
            <BiEdit
              onClick={() => editToggle(true, "section2")}
              className="text-white font-size-23"
            />
          </div>
        )}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="service-content">
                <h1>{sectionSecond?.title}</h1>
                <p>{sectionSecond?.subTitle}</p>
                <p>{sectionSecond?.description}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="flc_scr">
                <div className="service-image">
                  <img src={sectionSecond?.image1} alt="" className="img-fluid" />
                </div>
              </div>  
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AboutSecondSection;
