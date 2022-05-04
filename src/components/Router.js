import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Nav from "components/Nav";
import Profile from "routes/Profile";
import styled from "styled-components";

const RouterWrapper = styled.div`
  margin: 0 auto;
  max-width: 980px;
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Nav userObj={userObj} />}
      <RouterWrapper>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home userObj={userObj} />} />
              <Route
                exact
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <Route exact path="/" element={<Auth />} />
          )}
        </Routes>
      </RouterWrapper>
    </HashRouter>
  );
};

export default AppRouter;
