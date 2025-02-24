import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const User = () => {
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("name"));
  console.log(searchParams.get("lastname"));
  console.log(params);

  useEffect(() => {
    const response = async () => {
      const data = await fetch(
        `https://fakestoreapi.com/users/${params?.userId}`
      );
      const formattedData = await data.json();
      setUserData(formattedData);
    };
    response();
  }, []);

  return (
    <div>
      {userData?.name === undefined ? (
        <div>Loading...</div>
      ) : (
        <>
          <h4>User Name: {userData?.username}</h4>
        </>
      )}
    </div>
  );
};

export default User;
