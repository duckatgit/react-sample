import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";

const DraggableImage = ({ id, index, moveImage, deleteImage }) => {
  const { t } = useTranslation();
  const [, drag] = useDrag({
    type: "IMAGE",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div className="draggable" ref={(node) => drag(drop(node))}>
      {index === 0 && (
        <div className="coverimg">
          <p>{t("cover")}</p>
        </div>
      )}
      <i
        className="bx bxs-trash"
        id={`delete-${index}-tooltip`}
        onClick={() => deleteImage(index)}
      ></i>
      <UncontrolledTooltip placement="top" target={`delete-${index}-tooltip`}>
        {"Delete"}
      </UncontrolledTooltip>

      <img
        style={{ width: "100%", height: "180px", objectFit: "contain" }}
        alt={"Product image"}
        src={id}
      />
    </div>
  );
};

export default DraggableImage;
