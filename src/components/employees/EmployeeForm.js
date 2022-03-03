import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const EmployeeForm = () => {
  const [employee, updateEmployee] = useState({});
  const [employeeSpecialties, updateEmployeeSpecialty] = useState({});
  const history = useHistory();
  // once Hire employee button is clicked, we need a function to perform Post operation
  // function that uses state variable to create a new obj to post to API

  const hireEmployee = (event) => {
    event.preventDefault();
    const chosenEmployee = {
      name: employee,
      specialty: employeeSpecialties,
    };
    event.preventDefault();
    // send chosenEmployee obj to API
    const fetchOption = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      //   save the body of the request which is the chosenEmployee obj
      body: JSON.stringify(chosenEmployee),
    };

    return fetch("http://localhost:8088/employees", fetchOption).then(() => {
      //   the history.push below ??
      history.push("/employees");
    });
  };

  // create hire employee form user will interact w/

  return (
    <form>
      <h2>New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
            onChange={(evt) => {
              updateEmployee(evt.target.value);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="specialty">Specialty:</label>
          <input
            required
            autoFocus
            id="specialty"
            type="text"
            className="form-control"
            placeholder="Technical specialty"
            onChange={(evt) => {
              const copy = { ...employeeSpecialties };
              copy.employeeSpecialties(evt.target.value);
              updateEmployeeSpecialty(evt.target.value);
            }}
          />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={hireEmployee}>
        Finish Hiring
      </button>
    </form>
  );
};
