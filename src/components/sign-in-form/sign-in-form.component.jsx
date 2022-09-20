import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createAuthUserWithEmailAndPassword({ email, password });
      console.log("auth verified ");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-form">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          name="email"
          onChange={handleChange}
        ></FormInput>
        <FormInput
          label="Password"
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
        ></FormInput>
        <Button>Sign In</Button>
      </form>
      <Button buttonType="google" onClick={logGoogleUser}>Sign in with Google</Button>
    </div>
  );
};

export default SignInForm;
