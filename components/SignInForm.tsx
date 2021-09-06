import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import firebase from "../firebase/init";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export function signInWithGoogle(callback?: () => void): void {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => callback && callback())
    .catch((err) => console.error(err.message));
}

export function signInWithEmail(
  email: string,
  password: string,
  callback?: () => void
): void {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => callback && callback())
    .catch((err) => console.error(err.message));
}

export function signUpWithEmail(
  email: string,
  password: string,
  callback?: () => void
): void {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => callback && callback())
    .catch((err) => console.error(err.message));
}

const SignInForm = () => {
  return (
    <Wrapper>
      <Button color="google plus" onClick={() => signInWithGoogle()}>
        Google sign in
      </Button>
    </Wrapper>
  );
};

export default SignInForm;
