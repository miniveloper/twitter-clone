import React from "react";
import styled from "styled-components";
import { authService } from "./../fb";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  min-width: 320px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
`;

const Button = styled.button`
  border-radius: 20px;
  border: none;
  padding: 10px 0%;
  font-size: 12px;
  text-align: center;
  width: 150px;
  background-color: white;

  cursor: pointer;
`;

const BtnText = styled.span``;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      currentTarget: { name },
    } = event;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    console.log(provider);
    console.log(event.target);

    await signInWithPopup(authService, provider);
  };

  return (
    <AuthContainer>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <ButtonBox>
        <Button onClick={onSocialClick} name="google">
          <BtnText>Continue with Google</BtnText>
          <FontAwesomeIcon icon={faGoogle} style={{ marginLeft: "5" }} />
        </Button>
        <Button onClick={onSocialClick} name="github">
          <BtnText>Continue with Github</BtnText>
          <FontAwesomeIcon icon={faGithub} style={{ marginLeft: "5" }} />
        </Button>
      </ButtonBox>
    </AuthContainer>
  );
};

export default Auth;
