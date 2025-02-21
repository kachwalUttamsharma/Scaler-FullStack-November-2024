import React, { useEffect, useState } from "react";

const UserData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log("second effect");
  });
  return (
    <>
      <div>UserData</div>
      {data.length <= 0 ? (
        <div>Loading ... </div>
      ) : (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> ({user.username})
              <br />
              Email: {user.email}
              <br />
              Address: {user.address.street}, {user.address.city}
              <br />
              Phone: {user.phone}
              <br />
              Website:
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
              <br />
              Company: {user.company.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserData;
