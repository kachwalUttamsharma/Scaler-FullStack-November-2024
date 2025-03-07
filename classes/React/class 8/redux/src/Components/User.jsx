import React, { useEffect, useState } from "react";

function User() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [val, setVal] = useState("");
  useEffect(
    function () {
      async function abc() {
        try {
          setLoading(true);
          const resp = await fetch(
            `https://jsonplaceholder.typicode.com/users/${val}`
          );
          const user = await resp.json();
          console.log("user", user);
          setUser(user);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      abc();
    },
    [val]
  );

  const heading = (
    <div>
      <h2>User Example</h2>
      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );

  if (loading) {
    return (
      <>
        {heading}
        <h3>...Loading</h3>
      </>
    );
  }
  if (error) {
    return (
      <>
        {heading}
        <h3>Error occurred</h3>
      </>
    );
  }
  return (
    <>
      {heading}
      <h4>Name: {user.name}</h4>
      <h4>Phone: {user.phone}</h4>
    </>
  );
}

export default User;
