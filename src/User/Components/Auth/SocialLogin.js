import React from "react";
import { useDispatch } from "react-redux";

import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { InstagramLogin } from "@amraneze/react-instagram-login";

import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import {
  postGoogleLogin,
  postGoogleSignup,
} from "Store/userAuthentication/thunks";

const SocialLogin = ({ handleCloseModal, isSignUp }) => {
  const dispatch = useDispatch();

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        let res;
        if (isSignUp) {
          res = await dispatch(
            postGoogleSignup({ accessToken: response?.access_token })
          );
        } else {
          res = await dispatch(
            postGoogleLogin({ accessToken: response?.access_token })
          );
        }
        if (res.meta.requestStatus === "fulfilled") {
          handleCloseModal();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleLoginWithInsta = (response) => {};

  return (
    <div>
      <div className="social_icons">
        <FcGoogle className="google" onClick={handleLoginWithGoogle} />

        <InstagramLogin
          cssClass={"custom_insta"}
          clientId={"1951306595241351"}
          onSuccess={handleLoginWithInsta}
          onFailure={handleLoginWithInsta}
          redirectUri={"https://1219-122-161-192-114.ngrok-free.app/"}
          scope="user_profile,user_media"
        >
          <AiOutlineInstagram className="insta" />
        </InstagramLogin>

        <BsApple className="apple" />
      </div>
    </div>
  );
};

export default SocialLogin;
