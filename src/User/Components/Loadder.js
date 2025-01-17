import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <div className="container mx-12">
        <div className="circle one" />
        <div className="circle two" />
        <div className="circle three" />
        <span style={{ color: "#084781" }} className="mx-2 mb-5">
          In Processing...
        </span>
      </div>
    </div>
  );
};

export default Loader;
