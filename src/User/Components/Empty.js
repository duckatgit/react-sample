import React from "react";
import emptyImage from "assets/images/empty_folder.svg";

function Empty({ msg }) {
  return (
    <div>
      <div className="empty_wrap mt-5">
        <div className="empty_folder">
          <img src={emptyImage} className="image-fluid" />
        </div>
        <div className="empty_text text-center mt-5">
          <h3>{msg}</h3>
        </div>
      </div>
    </div>
  );
}

export default Empty;
