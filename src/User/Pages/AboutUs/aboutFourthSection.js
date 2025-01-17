import React from "react";

// React Icons & Images
import { BiEdit } from "react-icons/bi";

const AboutFourthSection = ({ sectionFourth, editToggle }) => {
  return (
    <React.Fragment>
      <section className="garden">
      {location?.pathname === "/about-us/edit" && (
          <div className="edithome_icon bg-dark">
            <BiEdit
              onClick={() => editToggle(true, "section4")}
              className="text-white font-size-23"
            />
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="garden-image">
                <img src={sectionFourth?.image1} className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content content_wrap">
                <p>{sectionFourth?.title}</p>
                <p>{sectionFourth?.subTitle}</p>
                <p>{sectionFourth?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AboutFourthSection;
