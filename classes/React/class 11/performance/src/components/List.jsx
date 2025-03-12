import React, { useState, useTransition } from "react";

const List = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleInput = (e) => {
    setInput(e.target.value);
    startTransition(() => {
      const newList = [];
      for (let i = 0; i < 200000; i++) {
        newList.push(e.target.value);
        console.log(i);
      }
      setList(newList);
    });
  };
  return (
    <div>
      <h1>List</h1>
      <input type="text" value={input} onChange={(e) => handleInput(e)} />
      {isPending ? (
        <div>List is loaded or building</div>
      ) : (
        list?.map((item, idx) => {
          return <div key={idx}>{`${item} : ${idx}`}</div>;
        })
      )}
    </div>
  );
};

export default List;
