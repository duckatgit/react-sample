import React from "react";
import { useLocation } from "react-router-dom";

// React Icons  & Images
import { BiEdit } from "react-icons/bi";

const AboutFirstSection = ({ sectionFirst, editToggle }) => {
  const location = useLocation();

  return (
    <React.Fragment>
      <section className="about d-flex align-items-center justify-content-center text-center remove-height">
        {location?.pathname === "/about-us/edit" && (
          <div className="edithome_icon bg-dark">
            <BiEdit
              onClick={() => editToggle(true, "section1")}
              className="text-white font-size-23"
            />
          </div>
        )}

        <div className="container">
          <div className="bubble-group group-content">
            <div className="content">
              <img src={sectionFirst?.image2} className="left img-fluid" />
              {/* <p>
                <span>Home / </span>Support Ticket
              </p> */}

              <h1>{sectionFirst?.title}</h1>
              <p>{sectionFirst?.subTitle}</p>
              <img src={sectionFirst?.image1} className="right img-fluid" />
            </div>

            {/* <div className="bubble-1 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-2 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-3 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-4 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-5 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-6 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-7 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-8 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-9 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div>

            <div className="bubble-10 bubble-container anim bubble-animation-x">
              <div className="bubble bubble-animation-y"></div>
            </div> */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AboutFirstSection;
