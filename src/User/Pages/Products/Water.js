import React from "react";

const Water = ({ subProductList }) => {
  return (
    <React.Fragment>
      <section className="Product-banner">
        <div className="text-heading">
          <h1 className="text-center">{subProductList?.title}</h1>
          <p className="text-black">{subProductList?.description}</p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Water;
