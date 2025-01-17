import React from "react";

import { BiEdit } from "react-icons/bi";
import LineImage from "assets/images/lines.png";

const FourthSection = ({ edithomeModal, fourthSection }) => {
  return (
    <React.Fragment>
      <section className="raw-fine2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="raw-content">
                <img src={fourthSection?.image} alt="" className="img-fluid" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="content">
                <div className="raw">
                  <p className="mb-0"> {fourthSection?.title}</p>

                  {location?.pathname === "/edit" && (
                    <div className="editraw2_icon bg-dark">
                      <BiEdit
                        onClick={() => edithomeModal(true, "section4")}
                        className="text-white font-size-23"
                      />
                    </div>
                  )}

                  <img src={LineImage} alt="" className="img-fluid" />
                </div>
                <p>{fourthSection?.subTitle}</p>
                <p>{fourthSection?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FourthSection;
