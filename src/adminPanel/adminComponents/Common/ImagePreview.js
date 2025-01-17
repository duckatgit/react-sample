import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ImagePreview = ({ image, isOpen, setPreview, isImageTrue }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const close = () => {
    setPreview({ isOpen: false, image: "" });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={isOpen}
        onHide={close}
        backdrop={true}
        keyboard={false}
      >
        {!isImageTrue && (
          <Modal.Header closeButton>
            <Modal.Title>Image Preview</Modal.Title>
          </Modal.Header>
        )}
        {!isImageTrue && (
          <Modal.Body>
            <img
              className="preview_image"
              src={image}
              alt="Image"
              onLoad={handleImageLoad}
            />
            {imageLoaded && (
              <i className="bx bx-x closeImageIcons" onClick={close}></i>
            )}
          </Modal.Body>
        )}
        {isImageTrue && (
          <>
            <i className="bx bx-x closeImageIcons" onClick={close}></i>
            <img
              className="image_height"
              src={image}
              alt="Image"
              onLoad={handleImageLoad}
            />
          </>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default ImagePreview;
