import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import star from "assets/images/star.png";
import RatingModal from "User/Components/Auth/ratingModal";
import { getReviews, setLikeUser } from "Store/Product/thunks";
import Avatar from "assets/images/userAvatar.png";
import ViewAllRatingModal from "User/Components/Auth/ViewAllRatingModal";
import { useTranslation } from "react-i18next";

// Other imports...

const RatingReview = ({ rating, subproductId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let user = JSON.parse(localStorage.getItem("authUser"));
  const { getreview, isSuccess, isError } = useSelector(
    (state) => state?.product
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllRatingModalOpen, setIsAllRatingModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userReview, setUserReview] = useState(false);
  const [editReview, setEditReview] = useState({
    isEditable: false,
    id: "",
    rating: 0,
    review: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleAllReviewModal = () => {
    setIsAllRatingModalOpen(!isAllRatingModalOpen);
  };
  const handleEditReview = (status, id, rating, review) => {
    setEditReview({
      isEditable: status,
      id: id,
      rating: rating,
      review: review,
    });
    setIsModalOpen(!isModalOpen);
  };
  const handlecloseAllReview = () => {
    setIsAllRatingModalOpen(!isAllRatingModalOpen);
  };

  const handleLike = async () => {
    let likedList = JSON.parse(getreview?.reviewToShow?.likedUsers);

    if (isLiked) {
      likedList = likedList.filter((item) => item !== user?.id);
    } else {
      likedList.push(user?.id);
    }

    const response = await dispatch(
      setLikeUser({
        reviewId: getreview?.reviewToShow?.id,
        likedUsers: likedList,
      })
    );
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(getReviews({ subproductId: subproductId }));
    }
  };

  useEffect(() => {
    dispatch(getReviews({ subproductId: subproductId }));
  }, [subproductId]);

  useEffect(() => {
    if (getreview?.reviewToShow) {
      const isLiked = JSON.parse(getreview?.reviewToShow?.likedUsers).includes(
        user?.id
      );
      setIsLiked(isLiked);
    }
  }, [getreview]);

  useEffect(() => {
    if (user?.id) {
      setUserReview(
        user?.id == getreview.reviewToShow?.user?.id ? false : true
      );
    }
  }, [getreview]);

  return (
    <section id="rating" className="tab-panel">
      <div className="rating-reviews text-right">
        {userReview && (
          <button
            type="button"
            className="btn btn-primary my-3"
            onClick={toggleModal}
          >
            {t("ratingReview")}
          </button>
        )}
      </div>
      {isModalOpen && (
        <RatingModal
          handleEditReview={handleEditReview}
          isModalOpen={isModalOpen}
          subproductId={subproductId}
          toggleModal={toggleModal}
          editReview={editReview}
        />
      )}
      {isAllRatingModalOpen && (
        <ViewAllRatingModal
          isModalOpen={isAllRatingModalOpen}
          handlecloseAllReview={handlecloseAllReview}
          subproductId={subproductId}
        />
      )}

      <div className="customer-reviews">
        <h2 className="mb-1">{t("customerReviewRating")}</h2>
        <div className="row">
          <div className="col-lg-6 p-2">
            <div className="customer-group d-flex align-items-center justify-content-between">
              <div className="customers">
                <div className="rating-group">
                  <span>5</span>
                  <img src={star} alt="" className="img-fluid" />
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${getreview?.rating?.[5] || 0}%` }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span>{getreview?.rating?.[5] || 0}%</span>
                </div>
                <div className="rating-group">
                  <span>4</span>
                  <img src={star} alt="" className="img-fluid" />
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${getreview?.rating?.[4] || 0}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span>{getreview?.rating?.[4] || 0}%</span>
                </div>
                <div className="rating-group">
                  <span>3</span>
                  <img src={star} alt="" className="img-fluid" />
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${getreview.rating?.[3] || 0}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span>{getreview.rating?.[3] || 0}%</span>
                </div>
                <div className="rating-group">
                  <span>2</span>
                  <img src={star} alt="" className="img-fluid" />
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${getreview.rating?.[2] || 0}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span>{getreview.rating?.[2] || 0}%</span>
                </div>
                <div className="rating-group">
                  <span>1</span>
                  <img src={star} alt="" className="img-fluid" />
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${getreview.rating?.[1]}%` }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span>{getreview.rating?.[1] || 0}%</span>
                </div>
              </div>
              <div className="second-group text-center">
                <h1>{rating}</h1>
                <div className="star-group">
                  <Rating
                    initialValue={`${rating ? rating : 0}`}
                    readonly
                    size={25}
                  />
                </div>
                <p>
                  {getreview?.ratingCount} {t("ratings")}{" "}
                  {getreview?.reviewCount} {t("reviews")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-2">
            <div className="product-reviews">
              <p className="first">{t("productReview")}</p>
              {getreview.reviewToShow ? (
                <>
                  <div className="comments">
                    <div className="d-flex flex-row align-items-start my-2">
                      <img
                        src={
                          getreview?.reviewToShow?.user?.profileImage || Avatar
                        }
                        className="dummy me-3"
                      ></img>
                      <div className="customer_name">
                        <p className="m-0 set_style">
                          {getreview?.reviewToShow.user.firstName}{" "}
                          {getreview?.reviewToShow.user.lastName}
                        </p>
                        <p className="light mb-1">
                          {t("postedOn")}{" "}
                          {moment(getreview?.reviewToShow.updatedAt).format(
                            "DD MMM YYYY"
                          )}
                        </p>
                        <div className="start_wrap">
                          <Rating
                            initialValue={`${
                              getreview?.reviewToShow?.rating
                                ? getreview?.reviewToShow?.rating
                                : 0
                            }`}
                            readonly
                            size={25}
                          />
                        </div>
                      </div>
                      {user?.id &&
                        getreview?.reviewToShow.user?.id === user?.id && (
                          <i
                            className="bx bx-edit-alt fontIcon"
                            onClick={() => {
                              handleEditReview(
                                true,
                                getreview.reviewToShow.id,
                                getreview.reviewToShow.rating,
                                getreview.reviewToShow.review
                              );
                            }}
                          ></i>
                        )}
                    </div>
                    <div className="like d-flex align-items-center justify-content-between p-2">
                      <p className="mb-0">{getreview?.reviewToShow.review}</p>
                    </div>
                    <div className="icon_like text-end">
                      {user?.id && getreview?.reviewToShow.review != "" && (
                        <i
                          className={
                            isLiked
                              ? `bx bxs-like fontIcon`
                              : `bx bx-like fontIcon`
                          }
                          onClick={handleLike}
                        ></i>
                      )}
                    </div>
                  </div>
                  <hr className="line" />
                  <div className="see-reviews">
                    <button
                      className="btn btn-primary"
                      onClick={toggleAllReviewModal}
                    >
                      {t("seeAllreview")}
                    </button>
                  </div>
                </>
              ) : (
                <p>{t("noReviewFound")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingReview;
