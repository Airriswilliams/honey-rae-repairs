import React, { useEffect, useState } from "react";

export const TicketList = () => {
  // [tickets is the variable name, updateTickets is the function]
  const [tickets, updateTickets] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:8088/serviceTickets?_expand=employee&_expand=customer"
    )
      .then((res) => res.json())
      .then((data) => {
        updateTickets(data);
      });
  }, []);

  return (
    <>
      {tickets.map((ticket) => {
        return (
          <p key={`ticket--${ticket.id}`}>
            {ticket.description} submitted by {ticket.customer.name} and worked
            on by {ticket.employee.name}
          </p>
        );
      })}
    </>
  );
};
