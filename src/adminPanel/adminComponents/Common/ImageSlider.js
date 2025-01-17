import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ImageSlider = ({ image, isOpen, setPreview, isImageTrue }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const close = () => {
    setPreview({ isOpen: false, image: [] });
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
        <Modal.Body>
          <Swiper
            modules={[Navigation, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
          >
            {image &&
              image?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="col-md-12">
                    <div className="box">
                      <div className="product-center text-center">
                        <div className="link_about mt-2">
                          <img
                            src={item}
                            alt="abcd"
                            className="setbottleheight img-fluid w-100"
                            onLoad={handleImageLoad}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </Modal.Body>
        {imageLoaded && (
          <i className="bx bx-x closeImageIcons" onClick={close}></i>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default ImageSlider;
