import React from 'react';
import Volca from "assets/images/white-logo.png"

function MainLoader() {
  return (
    <div className="container loader">
      <div className="blue">
        <img src={Volca} alt="logo" />
      </div>
    </div>
  );
}

export default MainLoader;