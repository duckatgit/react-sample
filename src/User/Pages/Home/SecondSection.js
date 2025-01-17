import React from "react";

// Images & React Icons
import LineImage from "assets/images/lines.png";
import { BiEdit } from "react-icons/bi";

const SecondSection = ({ secondsection, edithomeModal }) => {
  return (
    <React.Fragment>
      <section className="choose-us">
        {location?.pathname === "/edit" && (
          <div className="editchoose_icon bg-dark">
            <BiEdit
              onClick={() => edithomeModal(true, "section2")}
              className="text-white font-size-23"
            />
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="bottle">
                <img src={secondsection?.image} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="bottle-content">
                <div className="choose">
                  <p className="mb-0">
                    {secondsection?.title || "Why Choose Us ?"}
                  </p>
                  <img src={LineImage} alt="" className="img-fluid" />
                </div>
                <p className="second mt-2 mb-1">
                  {secondsection?.subTitle ||
                    "A Trusted Name In Bottled Water Industry"}
                </p>
                <p className="third">{secondsection?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SecondSection;
