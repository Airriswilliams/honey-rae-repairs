import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import "./Tickets.css";

export const TicketList = () => {
  // [tickets is the variable name, updateTickets is the function]
  const [tickets, updateTickets] = useState([]);
  const [gointToDeleteTicket, updategointToDeleteTicket] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(
      "http://localhost:8088/serviceTickets?_expand=employee&_expand=customer"
    )
      .then((res) => res.json())
      .then((data) => {
        updateTickets(data);
      });
  }, [gointToDeleteTicket]);

  //Function to delete the service request.
  const deleteTicket = (id) => {
    fetch(`http://localhost:8088/serviceTickets/${id}`, {
      method: "DELETE",
      // after DELETE operation, we need to GET all the service tickets again and render the new state.
    }).then(() => {
      updategointToDeleteTicket([1]);
    });
  };

  {
    /* use history() to immediately change URL to show the ticket form /tickets/create */
  }
  return (
    <>
      <button onClick={() => history.push("/tickets/create")}>
        Create Ticket
      </button>
      {/* // is ticket.emergency true, if yes emergency if false ticket //{" "}
      <Link>{ticket.description}</Link> links are creating a link for each
      individual ticket // when hyperlink is clicked the view will change to
      just the details of that ticket */}
      {tickets.map((ticket) => {
        return (
          <div key={`ticket--${ticket.id}`}>
            <p className={`ticket ${ticket.emergency ? "emergency" : ""}`}>
              {ticket.emergency ? "🚑" : ""}{" "}
              <Link to={`/tickets/${ticket.id}`}>{ticket.description}</Link>{" "}
              submitted by {ticket.customer.name} and worked on by{" "}
              {ticket.employee.name}
              <button
                onClick={() => {
                  deleteTicket(ticket.id);
                }}
              >
                Delete
              </button>
            </p>
          </div>
        );
      })}
    </>
  );
};
