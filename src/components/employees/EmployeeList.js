import React, { useEffect, useState } from "react";

export const EmployeeList = () => {
  // [employees is the variable name, changeEmployee is the function]
  const [employees, changeEmployee] = useState([]);
  const [specialties, setSpecial] = useState("");

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
      <div>Specialties: {specialties}</div>
      {employees.map((employee) => {
        return <p key={`employee--${employee.id}`}>{employee.name}</p>;
      })}
    </>
  );
};
