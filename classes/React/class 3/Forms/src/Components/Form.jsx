import React, { useState } from "react";

const Form = () => {
  //   const [name, setName] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validate = () => {
    if (formValues.name.length <= 0 || !formValues.name) {
      setErrors((prevState) => {
        return {
          ...prevState,
          name: "Name shouldn't be empty",
        };
      });
    }
    if (formValues.email.length <= 0 || !formValues.email) {
      setErrors((prevState) => {
        return {
          ...prevState,
          email: "Email shouldn't be empty",
        };
      });
    }
    if (formValues.password.length <= 0 || !formValues.password) {
      setErrors((prevState) => {
        return {
          ...prevState,
          password: "Password shouldn't be empty",
        };
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    setErrors(null);
    validate();
    if (!errors) {
      console.log({
        name,
        password,
        email,
      });
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={changeHandler}
          value={formValues.name}
        />
        {errors?.name && <div>{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={changeHandler}
          value={formValues.email}
        />
        {errors?.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={changeHandler}
          value={formValues.password}
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
      <button>Submit</button>
    </form>
  );
};

export default Form;
