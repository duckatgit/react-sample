import React, { useState, memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import avatar from "assets/images/up.png";
import { toast } from "react-toastify";

function DropZone(props) {
  const [error, setError] = useState(null);
  const [files, setFiles] = useState(null);
  const imageFile = files && files.preview ? files.preview : files;

  const handleAcceptedFiles = (_files) => {
    const validFiles = _files?.filter((file) => file?.size < 5e6);
    if (validFiles.length < _files.length) {
      return toast.error("Max. upload file size: 5MB", {
        autoClose: 5000,
      });
    }
    validFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(validFiles[0]);
    setError(false);
    if (props.onImageChange && props.usedForSubproduct) {
      props.onImageChange(validFiles);
    } else if (props.onImageChange && !props.usedForSubproduct) {
      props.onImageChange(validFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop: useCallback((acceptedFiles) => {
      const file = acceptedFiles;
      if (!file) {
        alert("Please select a file.");
        return;
      }
      handleAcceptedFiles(file);
    }, []),
  });

  useEffect(() => {
    if (props.selectedFile) {
      setFiles(props.selectedFile);
    }
  }, [props.selectedFile]);

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  return (
    <div
      className="container"
      style={{ height: "180px", position: "relative" }}
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input type="file" {...getInputProps()} />
        {error && (
          <div className="error-message">{props.t("imageRequired")}</div>
        )}
        <img
          className="rounded avatar-xl"
          style={{ width: "100%", height: "180px", objectFit: "contain" }}
          alt={"Product image"}
          src={imageFile && !props.usedForSubproduct ? imageFile : avatar}
        />
      </div>
    </div>
  );
}

DropZone.propTypes = {
  selectedFile: PropTypes.array,
  onImageChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.string,
};

export default memo(DropZone);
