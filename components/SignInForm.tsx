import { useState } from "react";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import firebase from "../firebase/init";

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
  const [isNew, setIsNew] = useState(false);

  const enterApp = () => {
    if (isNew) signUpWithEmail("", "");
    else signInWithEmail("", "");
  };
  return (
    <div>
      <Button onClick={() => signInWithGoogle()}>Google sign in</Button>
      <Button onClick={() => setIsNew(!isNew)}>
        {isNew ? "Already a member" : "New User"}
      </Button>
      <Form onSubmit={(data) => console.log({ data })}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field name="username" defaultValue="" label="User name" isRequired>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="password" defaultValue="" label="Password" isRequired>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Button type="submit" appearance="primary">
              {isNew ? "Sign in" : "Sign up"}
            </Button>
          </form>
        )}
      </Form>
    </div>
  );
};

export default SignInForm;
