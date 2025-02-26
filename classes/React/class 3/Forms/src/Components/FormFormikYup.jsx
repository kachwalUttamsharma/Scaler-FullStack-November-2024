import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormFormikYup = () => {
  const validateSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 character long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is Required"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <div>
          <label htmlFor="name">Name: </label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage component="div" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage component="div" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <Field type="password" name="password" id="password" />
          <ErrorMessage component="div" name="password" />
        </div>
        <button>Submit</button>
      </Form>
    </Formik>
  );
};

export default FormFormikYup;
