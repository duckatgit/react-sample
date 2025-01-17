import React from "react";

// React Icons & Images
import LineImage from "assets/images/lines.png";
import { BiEdit } from "react-icons/bi";

const SectionThird = ({ edithomeModal, thirdSection }) => {
  return (
    <React.Fragment>
      <section className="raw-fine">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="raw-content">
                <div className="raw">
                  <p className="mb-0">
                    {thirdSection?.title || "Volca Raw and Fine"}
                  </p>

                  {location?.pathname === "/edit" && (
                    <div className="editraw_icon bg-dark">
                      <BiEdit
                        onClick={() => edithomeModal(true, "section3")}
                        className="text-white font-size-23"
                      />
                    </div>
                  )}

                  <img src={LineImage} alt="" className="img-fluid" />
                </div>
                <p>{thirdSection?.subTitle}</p>
                <p className="mb-0">{thirdSection?.description}</p>
              </div>
            </div>
            <div className="col-md-6 pr-0">
              <div className="image third_img">
                <img src={thirdSection?.image} alt="" className="img-fluid show_desktop" />
                {/* <img src={thirdSection?.image} alt="" className="img-fluid show_mobile" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SectionThird;
