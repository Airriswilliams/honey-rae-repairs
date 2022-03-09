import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../ApiManager";
// function purpose is to render a string of how many customers we have
// and strings of each customer name

export const CustomerList = () => {
  // useState is referred to as a hook and when you invoke useState it returns an array
  // it returns an initial value "customers" & it returns a function
  // that modifies our state "setCustomers" is the function
  // useState capturing and storing new state specifically for customers in the CustomerList function
  const [customers, setCustomers] = useState([]);
  const [sumOfCustomersDisplay, updateMessage] = useState("");
  // "hook" useEffect takes 2 arguments a function and an array
  // useEffect is to run code when certain state changes i.e. event listener
  // useEffect is how we get "fetch" the data we need.
  // fetch gets json from database.json and turns that response into JavaScript using this JS method.
  useEffect(() => {
    console.log("Initial useEffect");
    getAllCustomers().then((customerArray) => {
      setCustomers(customerArray);
    });
  }, []);

  useEffect(() => {
    console.log("Customers state changed");
    if (customers.length === 1) {
      updateMessage("You have 1 customer");
    } else {
      updateMessage(`You have ${customers.length} customers`);
    }
  }, [customers]);

  return (
    <>
      <div>{sumOfCustomersDisplay}</div>
      {/* for each customerObject in the customers array it will be returned as JSX */}
      {/* slice is used to only display up to 5 customers */}
      {customers.slice(0, 5).map((customerObject) => {
        return (
          <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
        );
      })}
    </>
  );
};
// keys are basically id's but are "keys" in react
