import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Tickets.css";

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

  const deleteTicket = (id) => {
    fetch(`http://localhost:8088/serviceTickets/${id}`, {
      method: "DELETE",
    });
  };

  {
    /* use history() to immediately change URL to show the ticket form /tickets/create */
  }
  return (
    <>
      <div>
        <button onClick={() => history.push("/tickets/create")}>
          Create Ticket
        </button>
      </div>
      {active}

      {tickets.map((ticket) => {
        return (
          // is ticket.emergency true, if yes emergency if false ticket
          // <Link>{ticket.description}</Link> links are creating a link for each individual ticket
          // when hyperlink is clicked the view will change to just the details of that ticket
          <p className={ticket.emergency ? `emergency` : `ticket`}>
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
        );
      })}
    </>
  );
};
