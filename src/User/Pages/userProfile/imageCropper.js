import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { Link } from "react-router-dom";

class ImageCropper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image,
      ratio: 1 / 1,
      scale: 0.2,
      blob: false,
    };

    this.cropper = React.createRef();

    this.uploadFile = this.uploadFile.bind(this);
    this.setdCrop = this.setdCrop.bind(this);
    this.setCrop = this.setCrop.bind(this);
    this.crop = this.crop.bind(this);
    this.rotate = this.rotate.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  uploadFile(e) {
    this.setState({
      image: e[0].preview,
    });
  }

  setCrop() {
    this.setState((prevState) => ({ scale: prevState.scale + 0.1 }));
  }

  setdCrop() {
    this.setState((prevState) => ({ scale: prevState.scale - 0.1 }));
  }

  rotate(method) {
    const cropper = this.cropper.current.cropper;

    switch (method) {
      case "left":
        cropper.rotate(-90);
        break;
      case "right":
        cropper.rotate(90);
        break;
    }
  }

  crop(e) {
    const { detail } = e;

    this.setState({
      cropWidth: detail.width,
      cropHeight: detail.height,
    });
  }

  saveImage() {
    this.cropper.current.cropper.getCroppedCanvas().toBlob((blob) => {
      this.props.callToUpload(blob);
    });
  }

  handleImageUpload(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageDataURL = event.target.result;
        this.setState({ image: imageDataURL });
      };

      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <Modal
        className="cropper_modal"
        centered
        show={this.props?.isOpen}
        onHide={this.props?.close}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.t("updateProfile")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-0">
          <div className="ImageCropper">
            <div className="ImageCropper__preview">
              <img
                className="ImageCropper__preview-img"
                src={this.cropper?.current?.cropper
                  ?.getCroppedCanvas()
                  .toDataURL()}
              ></img>
            </div>
            <div className="ImageCropper__container">
              {this.state.image && (
                <div style={{ maxWidth: 768 }}>
                  <Cropper
                    className="Cropper"
                    ref={this.cropper}
                    src={this.state.image}
                    style={{ height: 400, width: "100%" }}
                    aspectRatio={this.state.ratio}
                    guides={true}
                    zoomTo={this.state.scale}
                    viewMode={2}
                    crop={this.crop}
                  />
                  <br />
                  <div className="ImageCropper__container-options">
                    <button
                      type="button"
                      title="Rotate left"
                      className="ImageCropper__container-options-button"
                      onClick={() => this.rotate("left")}
                    >
                      <i className="bx bx-rotate-left"></i>
                    </button>
                    <button
                      type="button"
                      title="Rotate Right"
                      className="ImageCropper__container-options-button"
                      onClick={() => this.rotate("right")}
                    >
                      <i className="bx bx-rotate-right"></i>
                    </button>
                    <button
                      type="button"
                      title="Zoom In"
                      className="ImageCropper__container-options-button"
                      onClick={this.setCrop}
                    >
                      <i className="bx bx-zoom-in"></i>
                    </button>
                    <button
                      type="button"
                      title="Zoom Out"
                      className="ImageCropper__container-options-button"
                      onClick={this.setdCrop}
                    >
                      <i className="bx bx-zoom-out"></i>
                    </button>
                    <button
                      type="button"
                      title="Reset"
                      className="ImageCropper__container-options-button"
                      onClick={() => this.cropper.current.cropper.reset()}
                    >
                      <i className="bx bx-reset"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <div>
            {/* <Button variant="contained" type="button" onClick={this.saveImage}>
              Update
            </Button> */}
            <div className="contact" onClick={this.saveImage}>
              <div className="clip">
                <div className="round"></div>
                <Link className="size">{this.props.t("upload")}</Link>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ImageCropper;
