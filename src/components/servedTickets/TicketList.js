import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const TicketList = () => {
  // [tickets is the variable name, updateTickets is the function]
  const [tickets, updateTickets] = useState([]);
  const [active, setActive] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch(
      "http://localhost:8088/serviceTickets?_expand=employee&_expand=customer"
    )
      .then((res) => res.json())
      .then((data) => {
        updateTickets(data);
      });
  }, []);

  useEffect(() => {
    const activeTicketCount = tickets.filter(
      (t) => t.dateCompleted === ""
    ).length;
    setActive(`There are ${activeTicketCount} open tickets`);
  }, [tickets]);

  return (
    <>
      {/* use history() to immediately change URL to show the ticket form /tickets/create */}
      <div>
        <button onClick={() => history.push("/tickets/create")}>
          Create Ticket
        </button>
      </div>
      {active}

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
