import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import FormFormikYup from "./Components/FormFormikYup";
import FormikForm from "./Components/FormikForm";
import TemperatureDisplay from "./Components/TemperatureDisplay";
import TemperatureInput from "./Components/TemperatureInput";
import Counter from "./Components/Counter";
import UserData from "./Components/UserData";

function App() {
  const [temperature, setTemperature] = useState("");

  return (
    <>
      {/* <div>Forms</div> */}
      {/* <Form /> */}
      {/* <FormikForm />
      <FormFormikYup /> */}
      {/* <TemperatureInput
        temperature={temperature}
        setTemperature={setTemperature}
      />
      <TemperatureDisplay temperature={temperature} /> */}
      {/* <Counter /> */}
      <UserData />
    </>
  );
}

export default App;
