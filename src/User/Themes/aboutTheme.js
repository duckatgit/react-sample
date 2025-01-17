import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import nProgress from "nprogress";

// Validations
import { validate } from "utils/common";

// Components
import Header from "User/Components/Header";
import Footer from "User/Components/Footer";
import AboutFirstSection from "User/Pages/AboutUs";
import AboutSecondSection from "User/Pages/AboutUs/aboutSecondSection";
import AboutThirdSection from "User/Pages/AboutUs/aboutThirdSection";
import AboutFourthSection from "User/Pages/AboutUs/aboutFourthSection";
import EditAboutusModal from "User/Components/editSettingModals/editAbout";

// Store
import { getAboutus, editAboutUs } from "Store/Settings/thunks";
import { toast } from "react-toastify";

const aboutTheme = () => {
  const { aboutUs, isError } = useSelector((state) => state?.Settings);
  const section1 = aboutUs.find(
    (section) => section.sectionName === "section1"
  );
  const section2 = aboutUs.find(
    (section) => section.sectionName === "section2"
  );
  const section3 = aboutUs.find(
    (section) => section.sectionName === "section3"
  );
  const section4 = aboutUs.find(
    (section) => section.sectionName === "section4"
  );

  const [toggleEditModal, settoggleEditModal] = useState(false);
  const [imagePreview2, setimagePreview2] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fields, setfields] = useState({
    title: "",
    subTitle: "",
    description: null,
    image1: null,
    image2: null,
  });

  const {
    title,
    titleError,
    subTitle,
    subTitleError,
    description,
    descriptionError,
    image1,
    image1Error,
    image2,
    image2Error,
  } = fields;

  const handleChange = useCallback((evt) => {
    const { value, name } = evt.target;
    setfields((prev) =>
      value !== "" || undefined || null
        ? { ...prev, [name + "Error"]: false, [name]: value }
        : { ...prev, [name + "Error"]: true, [name]: value }
    );
  }, []);

  const handleImageChange = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setfields({ ...fields, image1: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange2 = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setfields({ ...fields, image2: file });
      setimagePreview2(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (evt, sectionName) => {
    evt.preventDefault();
    nProgress.configure({ showSpinner: false });
    nProgress.start();
    let response = validate(fields);
    setfields((prev) => ({ ...prev, ...response }));
    if (
      !fields?.image1 ||
      !fields?.title ||
      !fields?.subTitle ||
      (sectionName === "section2" &&
        sectionName === "section3" &&
        sectionName === "section4" &&
        !fields.description) ||
      (sectionName === "section1" && !fields?.image2)
    )
      return nProgress.done();
    else {
      const data = {
        title: fields?.title,
        subTitle: fields?.subTitle,
        description: fields?.description || "null",
        image1: fields?.image1,
        image2: fields?.image2,
        sectionName: sectionName,
      };
      try {
        await dispatch(editAboutUs(data));
        await dispatch(getAboutus());
        settoggleEditModal(false);
        setImagePreview(null);
      } catch (error) {
        toast.error(error, {
          autoClose: 5000,
        });
      } finally {
        nProgress.done();
      }
    }
  };

  const aboutEditToggle = (isOpen, sectionName) => {
    const section = aboutUs.find(
      (section) => section.sectionName === sectionName
    );
    setfields({
      title: section?.title || "",
      subTitle: section?.subTitle || "",
      description: section?.description || null,
      image1: section?.image1 || null,
      image2: section?.image2 || null,
      sectionName: section?.sectionName || "",
    });
    settoggleEditModal(isOpen);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAboutus());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(isError, {
        autoClose: 5000,
      });
    }
  }, [isError]);

  return (
    <React.Fragment>
      <Header />

      {toggleEditModal && (
        <EditAboutusModal
          handleChange={handleChange}
          handleImageChange2={handleImageChange2}
          handleImageChange={handleImageChange}
          aboutEditToggle={aboutEditToggle}
          settoggleEditModal={settoggleEditModal}
          handleSubmit={onSubmit}
          sectionName={fields?.sectionName}
          title={title}
          titleError={titleError}
          subTitle={subTitle}
          subTitleError={subTitleError}
          description={description}
          descriptionError={descriptionError}
          image1={image1}
          ImagePreview={imagePreview}
          image1Error={image1Error}
          image2={image2}
          image2Error={image2Error}
          imagePreview2={imagePreview2}
        />
      )}

      {section1 && (
        <AboutFirstSection
          editToggle={aboutEditToggle}
          sectionFirst={section1}
        />
      )}
      {section2 && (
        <AboutSecondSection
          editToggle={aboutEditToggle}
          sectionSecond={section2}
        />
      )}
      {section3 && (
        <AboutThirdSection
          editToggle={aboutEditToggle}
          sectionThird={section3}
        />
      )}
      {section4 && (
        <>
          (
          <AboutFourthSection
            editToggle={aboutEditToggle}
            sectionFourth={section4}
          />
          <Footer />)
        </>
      )}
    </React.Fragment>
  );
};

export default aboutTheme;
