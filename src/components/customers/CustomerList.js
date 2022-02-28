import React, { useEffect, useState } from "react";

export const CustomerList = () => {
  // define state, when you invoke useState it returns an array
  // it returns an initial value "customers" & it returns a function
  // that modifies our state "setCustomers" is the function
  const [customers, setCustomers] = useState([]);
  // "hook" useEffect takes 2 arguments a function and an array
  // useEffect is to run code when certain state changes i.e. event listener
  useEffect(() => {
    fetch("http://localhost:8088/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      });
  }, []);

  useEffect(() => {}, [customers]);

  return (
    <>
      {customers.map((customerObject) => {
        return (
          <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
        );
      })}
    </>
  );
};
