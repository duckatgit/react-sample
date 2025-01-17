import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Rating } from "react-simple-star-rating"; // Make sure you have the correct import path
import { useDispatch } from "react-redux";
import {
  addReview,
  getReviews,
  getSubProductByid,
  updateReview,
} from "Store/Product/thunks";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";

function RatingModal({
  subproductId,
  isModalOpen,
  editReview,
  handleEditReview,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [reviewId, setReviewId] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [ratingerror, setRatingError] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
    if (value.trim().length > 0) {
      setMessageError(false);
    }
  };

  useEffect(() => {
    if (editReview.isEditable) {
      setRating(editReview.rating),
        setMessage(editReview.review),
        setReviewId(editReview.id);
    }
  }, [editReview]);

  const handleSubmit = async () => {
    const review = message.trim();
    if (!rating) {
      setRatingError(rating ? false : true);
      return;
    } else {
      let response;
      if (editReview.isEditable) {
        response = await dispatch(
          updateReview({
            subProductId: subproductId,
            review: message,
            rating: rating,
            reviewId: reviewId,
          })
        );
      } else {
        response = await dispatch(
          addReview({
            subProductId: subproductId,
            review: message,
            rating: rating,
          })
        );
      }
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(getReviews({ subproductId: subproductId }));
        dispatch(getSubProductByid({ id: subproductId }));
      }
      handleClose();
    }
  };

  const handleClose = () => {
    handleEditReview(false, "", 0, "");
  };
  return (
    <React.Fragment>
      <Modal
        className="modal_rating"
        centered
        show={isModalOpen}
        onHide={() => {
          handleClose();
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("ratingReview")}</Modal.Title>
        </Modal.Header>
        <div className="login-model">
          <div className="modal-body">
            <div className="ratings">
              <p className="mb-0">{t("ratingReview")}</p>
              <Rating initialValue={rating} onClick={handleRating} />
              {ratingerror && (
                <div className="ratingError">{t("ratingRequire")}</div>
              )}
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="inputAddress">{t("message")}</label>
                <Input
                  type="textarea"
                  className={`form-control msg ${
                    messageError ? "is-invalid" : ""
                  }`}
                  placeholder={t("writeMessage")}
                  value={message}
                  maxlength="500"
                  onChange={handleInputChange}
                ></Input>
                {messageError && (
                  <div className="ratingError">{t("messageRequired")}</div>
                )}
              </div>

              <div className="water">
                <div className="box second">
                  <div className="contact text-center">
                    <div className="clip">
                      <div className="round"></div>
                      <a onClick={handleSubmit}>{t("submit")}</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default RatingModal;
