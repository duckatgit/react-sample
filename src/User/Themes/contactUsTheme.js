import React, { useState, useEffect, useCallback } from "react";

// components
import Header from "User/Components/Header";
import Footer from "User/Components/Footer";
import ContactUs from "User/Pages/ContactUs/contactUs";
import { useSelector, useDispatch } from "react-redux";
import EditContactusModal from "User/Components/editSettingModals/editContact";
import { editContactUs, getContactus } from "Store/Settings/thunks";
import { validate, validateEmail } from "utils/common";
import nProgress from "nprogress";
import { toast } from "react-toastify";

const ContactUsTheme = () => {
  const { contactUs, isError } = useSelector((state) => state?.Settings);
  const [toggleEditModal, settoggleEditModal] = useState(false);
  const dispatch = useDispatch();
  const [fields, setfields] = useState({
    header: "",
    subHeader: "",
    aboutCompany: "",
    contactTitle: "",
    contactSubtitle: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const {
    header,
    headerError,
    subHeader,
    subHeaderError,
    aboutCompany,
    aboutCompanyError,
    contactTitle,
    contactTitleError,
    contactSubtitle,
    contactSubtitleError,
    address,
    addressError,
    phoneNumberError,
    phoneNumber,
    email,
    emailError,
  } = fields;

  const handleChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (name == "phoneNumber") {
      if (evt.target.value.length <= 10) {
        setfields((prev) =>
          (value !== "" || undefined || null) && value > 0 && value.length > 9
            ? { ...prev, [name + "Error"]: false, [name]: value }
            : { ...prev, [name + "Error"]: true, [name]: value }
        );
      }
    } else if (name == "email") {
      setfields((prev) =>
        (value !== "" || undefined || null) && validateEmail(value)
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    } else {
      setfields((prev) =>
        value !== "" || undefined || null
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  }, []);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    let response = validate(fields);
    setfields((prev) => ({ ...prev, ...response }));
    if (!response?.notValid) {
      const data = {
        header: fields?.header,
        subHeader: fields?.subHeader,
        aboutCompany: fields?.aboutCompany,
        contactTitle: fields?.contactTitle,
        contactSubtitle: fields?.contactSubtitle,
        address: fields?.address,
        phoneNumber: fields?.phoneNumber,
        email: fields?.email,
      };
      try {
        nProgress.configure({ showSpinner: false });
        nProgress.start();
        await dispatch(editContactUs(data));
        await dispatch(getContactus());
        settoggleEditModal(false);
      } catch (error) {
        toast.error(error, {
          autoClose: 5000,
        });
      } finally {
        nProgress.done();
      }
    }
  };

  const contactEditToggle = (isOpen) => {
    setfields({
      header: contactUs?.header || "",
      subHeader: contactUs?.subHeader || "",
      aboutCompany: contactUs?.aboutCompany || "",
      contactTitle: contactUs?.contactTitle || "",
      contactSubtitle: contactUs?.contactSubtitle || "",
      address: contactUs?.address || "",
      phoneNumber: contactUs?.phoneNumber || "",
      email: contactUs?.email || "",
    });
    settoggleEditModal(isOpen);
  };

  useEffect(() => {
    dispatch(getContactus());
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
      {toggleEditModal && (
        <EditContactusModal
          toggleEditModal={toggleEditModal}
          handleChange={handleChange}
          settoggleEditModal={settoggleEditModal}
          contactEditToggle={contactEditToggle}
          handleSubmit={onSubmit}
          header={header}
          headerError={headerError}
          subHeader={subHeader}
          subHeaderError={subHeaderError}
          aboutCompany={aboutCompany}
          aboutCompanyError={aboutCompanyError}
          contactTitle={contactTitle}
          contactTitleError={contactTitleError}
          contactSubtitle={contactSubtitle}
          contactSubtitleError={contactSubtitleError}
          address={address}
          addressError={addressError}
          phoneNumberError={phoneNumberError}
          phoneNumber={phoneNumber}
          email={email}
          emailError={emailError}
        />
      )}
      <Header />
      <ContactUs contactEditToggle={contactEditToggle} contactUs={contactUs} />
      <Footer />
    </React.Fragment>
  );
};

export default ContactUsTheme;
