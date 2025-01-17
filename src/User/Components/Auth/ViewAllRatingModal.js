import React, { useEffect, useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "assets/images/userAvatar.png";
import { Rating } from "react-simple-star-rating";
import PaginationContainer from "utils/paginationCommon";

import {
  getAllReviewData,
  getReviews,
  setLikeUser,
} from "Store/Product/thunks";

function ViewAllRatingModal({
  isModalOpen,
  handlecloseAllReview,
  subproductId,
}) {
  const dispatch = useDispatch();
  const { getAllReviews, pagination } = useSelector((state) => state?.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  let user = JSON.parse(localStorage.getItem("authUser"));

  const totalPages = Math.ceil(pagination?.totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };
  useEffect(() => {
    dispatch(
      getAllReviewData({
        subProductId: subproductId,
        pagination: {
          page: currentPage,
          take: itemsPerPage,
        },
      })
    );
  }, [subproductId, currentPage, itemsPerPage]);

  const handleLike = async (isLiked, commentId, likedUsers) => {
    let likedList = JSON.parse(likedUsers);

    if (isLiked) {
      likedList = likedList.filter((item) => item !== user?.id);
    } else {
      likedList.push(user?.id);
    }

    const response = await dispatch(
      setLikeUser({
        reviewId: commentId,
        likedUsers: likedList,
      })
    );
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(
        getAllReviewData({
          subProductId: subproductId,
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      );
      dispatch(getReviews({ subproductId: subproductId }));
    }
  };

  return (
    <React.Fragment>
      <Modal
        className="modal_rating"
        centered
        show={isModalOpen}
        onHide={() => {
          handlecloseAllReview();
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Rating & Reviews</Modal.Title>
        </Modal.Header>
        <div className="login-model">
          <div className="modal-body rating">
            {getAllReviews?.map((item, idx) => (
              <div className="comments rating" key={idx} value={item}>
                <div className="rating-group d-flex justify-content-between">
                  <div className="reviews-group my-2 d-flex flex-column align-items-center">
                    <img
                      src={item?.usersData?.profileImage || Avatar}
                      className="dummy popup"
                    ></img>
                    <p className="m-0 set_style text-left text-center">
                      {" "}
                      {item?.usersData.firstName} {item?.usersData.lastName}
                    </p>
                  </div>
                  <div className="customer_reviews">
                    <div className="star-group d-flex justify-content-between align-items-center">
                      <div className="start_wrap">
                        <Rating
                          initialValue={`${item?.rating ? item?.rating : 0}`}
                          readonly
                          size={25}
                        />
                      </div>
                      <p className="light mb-0 text-left author">
                        Posted on{" "}
                        {moment(item?.updatedAt).format("DD MMM YYYY")}
                      </p>
                    </div>
                    
                    <div className="like d-flex align-items-center justify-content-between p-2">
                      <p className="mb-0 text-left">{item?.review}</p>
                    </div>
                  </div>
                </div>
                {user?.id && item.review != "" && (
                  <div className="icon_like text-end d-flex align-items-center justify-content-end">
                    <span>{item?.likes}</span>
                    <i
                      className={
                        item.likedUsers.includes(user?.id)
                          ? `bx bxs-like fontIcon`
                          : `bx bx-like fontIcon`
                      }
                      onClick={() => {
                        handleLike(
                          item.likedUsers.includes(user?.id),
                          item?.id,
                          item.likedUsers
                        );
                      }}
                    ></i>
                  </div>
                )}
              </div>
            ))}
            <PaginationContainer
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
              isShowItem={false}
            />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default ViewAllRatingModal;
