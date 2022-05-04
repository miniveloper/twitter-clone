import { authService } from "fb";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;

  &[type="submit"] {
    text-align: center;
    background-color: #04aaff;
    color: white;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  margin: 0 auto;
  margin-bottom: 10px;
  color: #ff6b6b;
`;

const Switcher = styled.span`
  color: #04aaff;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;

  cursor: pointer;
`;

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message.replace("Firebase: ", "").replace("auth/", ""));
    }
  };

  const toggleAcc = () => setNewAccount((prev) => !prev);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <Input type="submit" value={newAccount ? "Create Account" : "Log in"} />
        {error && <ErrorText>{error}</ErrorText>}
      </Form>
      <Switcher onClick={toggleAcc}>
        {newAccount ? "Sign in" : "Create Account"}
      </Switcher>
    </>
  );
}

export default AuthForm;
