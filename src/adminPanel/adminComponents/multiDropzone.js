import React, { useState, memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import avatar from "assets/images/up.png";
import { toast } from "react-toastify";

function MultiDropZone(props) {
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

    setError(null);
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
    <div>
      <div {...getRootProps({ className: "MultiDropZone" })}>
        <input type="file" {...getInputProps()} />
        <div className="uploader">
          {props.t("image")} <i className="bx bxs-cloud-upload"></i>
        </div>
      </div>
      <p className="image_textt">{props.t("allowedFormats")}</p>
    </div>
  );
}

MultiDropZone.propTypes = {
  selectedFile: PropTypes.array,
  onImageChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.string,
};

export default memo(MultiDropZone);
