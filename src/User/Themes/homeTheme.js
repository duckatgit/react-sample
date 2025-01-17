import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import nProgress from "nprogress";

// Validations
import { validate } from "utils/common";
import { toast } from "react-toastify";

// Components
import Header from "User/Components/Header";
import Footer from "User/Components/Footer";
// import Loader from "User/Components/Loadder";
import Home from "User/Pages/Home";
import SectionThird from "User/Pages/Home/SectionThird";
import SecondSection from "User/Pages/Home/SecondSection";
import FourthSection from "User/Pages/Home/FourthSection";
import HomeProduct from "User/Pages/Home/homeProduct";
import EditHomeModal from "User/Components/editSettingModals/editHome";

// Store
import { getHomepage, editHomeSectionOne } from "Store/Settings/thunks";
import { useLocation } from "react-router-dom";

const homeTheme = () => {
  const location = useLocation();
  const { home, isError } = useSelector((state) => state?.Settings);
  const section1 = home.find((section) => section.sectionName === "section1");
  const section2 = home.find((section) => section.sectionName === "section2");
  const section3 = home.find((section) => section.sectionName === "section3");
  const section4 = home.find((section) => section.sectionName === "section4");
  const section5 = home.find((section) => section.sectionName === "section5");

  const query = new URLSearchParams(location?.search);
  const from = query.get("from");

  const [editModal, seteditModal] = useState(false);
  const [ImagePreview, setImagePreview] = useState(null);
  const [fields, setfields] = useState({
    title: "",
    subTitle: "",
    description: "",
    image: null,
  });

  const {
    title,
    titleError,
    subTitle,
    subTitleError,
    description,
    descriptionError,
    image,
    imageError,
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
      setfields({ ...fields, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (evt, sectionName) => {
    evt.preventDefault();
    nProgress.configure({ showSpinner: false });
    nProgress.start();
    let response = validate(fields);
    setfields((prev) => ({ ...prev, ...response }));
    if (
      !fields?.title ||
      !fields?.subTitle ||
      !fields?.description ||
      (sectionName !== "section5" && !fields?.image)
    )
      return nProgress.done();

    const data = {
      title: fields?.title,
      subTitle: fields?.subTitle,
      description: fields?.description,
      image: fields?.image || "null",
      sectionName: sectionName,
    };
    if (!response?.notValid) {
      try {
        await dispatch(editHomeSectionOne(data));
        await dispatch(getHomepage());
        seteditModal(false);
        setImagePreview(null);
      } catch (error) {
        toast.error(error, {
          autoClose: 5000,
        });
      } finally {
        nProgress.done();
      }
    } else {
      nProgress.done();
    }
  };

  const edithomeModal = (isOpen, sectionName) => {
    const section = home.find((section) => section.sectionName === sectionName);
    setfields({
      title: section?.title || "",
      subTitle: section?.subTitle || "",
      description: section?.description || "",
      image: section?.image || "",
      sectionName: section?.sectionName || "",
    });
    seteditModal(isOpen);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomepage());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(isError, {
        autoClose: 5000,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (from) {
      localStorage.setItem("from", from);
    }
  }, [from]);

  return (
    <React.Fragment>
      {/* {isLoading && <Loader />} */}

      {editModal && (
        <EditHomeModal
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          editModal={editModal}
          seteditModal={seteditModal}
          editSubmit={onSubmit}
          sectionName={fields?.sectionName}
          title={title}
          titleError={titleError}
          subTitle={subTitle}
          subTitleError={subTitleError}
          description={description}
          descriptionError={descriptionError}
          image={image}
          ImagePreview={ImagePreview}
          imageError={imageError}
        />
      )}
      <Header isHomePage={true} />

      {section1 && (
        <Home edithomeModal={edithomeModal} firstHomeSection={section1} />
      )}

      {section2 && (
        <SecondSection edithomeModal={edithomeModal} secondsection={section2} />
      )}

      {section3 && (
        <SectionThird edithomeModal={edithomeModal} thirdSection={section3} />
      )}

      {section4 && (
        <FourthSection edithomeModal={edithomeModal} fourthSection={section4} />
      )}

      {section5 && (
        <>
          (
          <HomeProduct
            edithomeModal={edithomeModal}
            productSection={section5}
          />
          <Footer />)
        </>
      )}
    </React.Fragment>
  );
};

export default homeTheme;
