import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody } from "reactstrap";

const ConfirmModal = (props) => {
  return (
    <Modal 
      className="modal-zindex"
      autoFocus={true}
      centered={true}
      {...props.modalProps}
      isOpen={props.isOpen}
      toggle={props.toggle}
    >
      <div className="modal-content remove-confirm">
        <ModalBody>
          {props.type === "danger" && (
            <div className="infoimg">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256    C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216    c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z"
                  fill="#f8c886"
                />
                <path
                  d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877    C276,137.831,267.046,128.877,256,128.877z"
                  fill="#f8c886"
                />
                <circle cx="256" cy="349.16" r="27" fill="#f8c886" />
              </svg>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.onConfirm(e);
            }}
          >
            <h4 className="text-center mt-2 mb-3">{props.title}</h4>

            <div className="delete-btns delete_modal">
              <Button
                className="cancel_btn"
                type="button"
                outline
                color="secondary"
                onClick={props.toggle}
              >
                {props?.cancelBtnText}
              </Button>

              <Button type="submit" color="primary">
                {props?.confirmBtnText}
              </Button>
            </div>
          </form>
        </ModalBody>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onConfirm: PropTypes.func,
  type: PropTypes.oneOf(["", "danger"]),
  title: PropTypes.string,
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
};

export default React.memo(ConfirmModal);
