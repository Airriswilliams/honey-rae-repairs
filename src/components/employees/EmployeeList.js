import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// importing these functions from react

export const EmployeeList = () => {
  // declaring the functional component named employee list which allow us to
  // export what I need to see on DOM
  // [employees is the variable name, changeEmployee is the function]
  const [employees, changeEmployee] = useState([]);
  const [specialties, setSpecial] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8088/employees")
      .then((res) => res.json())
      .then((employeesFromAPI) => {
        changeEmployee(employeesFromAPI);
      });
  }, []);

  useEffect(() => {
    const justSpecialties = employees.map((emp) => emp.specialty);
    setSpecial(justSpecialties.join(", "));
    /*
            1. Use .map() to get the specialty of each employee
            2. Then update a state variable to be a comma-separated string
                (e.g. "iPhone, Printers, ...")
        */
  }, [employees]);

  return (
    <>
      {/* use history() to immediately change URL to show the ticket form /employees/create */}
      <div>
        <button onClick={() => history.push("/employees/create")}>
          Hire Employee
        </button>
      </div>
      <div>Specialties: {specialties}</div>
      {employees.map((employee) => {
        return (
          <p key={`employee--${employee.id}`}>
            <Link to={`/employees/${employee.id}`}>{employee.name}</Link>
          </p>
        );
      })}
    </>
  );
};
