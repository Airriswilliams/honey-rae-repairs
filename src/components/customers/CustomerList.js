import React, { useEffect, useState } from "react";
// function purpose is to render a string of how many customers we have
// and strings of each customer name

export const CustomerList = () => {
  // useState is referred to as a hook and when you invoke useState it returns an array
  // it returns an initial value "customers" & it returns a function
  // that modifies our state "setCustomers" is the function
  // useState capturing and storing new state specifically for customers in the CustomerList function
  const [customers, setCustomers] = useState([]);
  // "hook" useEffect takes 2 arguments a function and an array
  // useEffect is to run code when certain state changes i.e. event listener
  useEffect(() => {
    fetch("http://localhost:8088/customers")
      // fetch gets json from database.json and turns that response into JavaScript using this JS method.
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      });
  }, []);
  // ASK ABOUT LINE 20????
  useEffect(() => {}, [customers]);

  return (
    <>
      {/* for each customerObject in the customers array it will be returned as JSX */}
      {customers.map((customerObject) => {
        return (
          <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
        );
      })}
    </>
  );
};
// keys are basically id's but are "keys" in react
