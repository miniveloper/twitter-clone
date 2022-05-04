import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./../fb";
import { updateProfile } from "firebase/auth";
import styled from "styled-components";

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  height: 100%;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
`;

const ProfileChange = styled.input`
  width: 100%;
  background-color: white;
  color: black;
  height: 40px;
  border-radius: 5px;
  margin: 10px 0;
  text-align: center;

  &:last-child {
    height: 30px;
    background-color: #04aaff;
    color: white;
    cursor: pointer;
  }
`;

const LogoutBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: #ee5253;
  color: white;
  margin-top: 40px;
  border-radius: 5px;
  cursor: pointer;
`;

const Profile = ({ userObj, refreshUser }) => {
  const [newName, setNewName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    refreshUser();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newName) {
      await updateProfile(authService.currentUser, { displayName: newName });
    }
    refreshUser();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewName(value);
  };

  return (
    <ProfileBox>
      <ProfileForm onSubmit={onSubmit}>
        <ProfileChange
          value={newName}
          onChange={onChange}
          autoFocus
          type="text"
          placeholder="Display name"
        />
        <ProfileChange type="submit" value="Update Profile" />
      </ProfileForm>

      <LogoutBtn onClick={onLogOutClick}>Log Out</LogoutBtn>
    </ProfileBox>
  );
};
export default Profile;
