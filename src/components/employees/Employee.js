import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Employee = () => {
  const [employee, set] = useState({}); // State variable for current employee object
  // obj destructuring "employeeId" matches employeeId in app views ln 40 route path
  // useParams allows your code to read a route parameter from the URL.
  const { employeeId } = useParams(); // Variable storing the route parameter

  useEffect(
    () => {
      fetch(`http://localhost:8088/employees/${employeeId}`)
        .then((res) => res.json())
        .then(set);
    },
    [employeeId] // Above function runs when the value of ticketId change
  );

  return (
    <>
      <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <div className="employee__specialty">
          {/* ? query string parameter that gives us access to the fk property on serviceTickets, gets the employee
          and customer object embedded in the individual ticket
          optional chaining is useful when you are trying to access properties of properties */}
          Specialty is {employee.specialty}
        </div>
      </section>
    </>
  );
};
