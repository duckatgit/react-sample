import React from "react";

const Descriptions = ({ description }) => {
  return (
    <React.Fragment>
      <div>
        <div className="tab-panels">
          <section id="desc" className="tab-panel">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Description
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p className="mb-0">{description}</p>
                  </div>
                </div>
              </div>
              {/* <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Return policy
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p className="mb-0">
                      Volca is a 100% natural, crisp, pristine & refreshing
                      Waterfall water.
                    </p>
                    <p>
                      Great Value Distilled Water is pure and pristine, free of
                      contaminants and minerals. Distilled water is a great
                      choice for both the office and home,
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Nutritional Facts
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p className="mb-0">
                      Volca is a 100% natural, crisp, pristine & refreshing
                      Waterfall water.
                    </p>
                    <p>
                      Great Value Distilled Water is pure and pristine, free of
                      contaminants and minerals. Distilled water is a great
                      choice for both the office and home,
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Features
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p className="mb-0">
                      Volca is a 100% natural, crisp, pristine & refreshing
                      Waterfall water.
                    </p>
                    <p>
                      Great Value Distilled Water is pure and pristine, free of
                      contaminants and minerals. Distilled water is a great
                      choice for both the office and home,
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Descriptions;
