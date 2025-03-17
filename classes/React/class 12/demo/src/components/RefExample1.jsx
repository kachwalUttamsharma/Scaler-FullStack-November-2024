import React, { useEffect, useRef, forwardRef } from "react";

const RefExample1 = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef.current);
  }, []);

  return (
    <>
      <ChildComponent ref={inputRef} />
    </>
  );
};

const ChildComponent = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

export default RefExample1;
