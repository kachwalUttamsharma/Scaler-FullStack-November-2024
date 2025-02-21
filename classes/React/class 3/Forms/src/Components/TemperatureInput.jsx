import React from "react";

const TemperatureInput = ({ temperature, setTemperature }) => {
  return (
    <div>
      <label>
        Enter temperature:
        <input
          type="text"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </label>
    </div>
  );
};

export default TemperatureInput;
