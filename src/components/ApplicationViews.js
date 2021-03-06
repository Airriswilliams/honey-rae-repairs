// this module works in tandem with the NavBar
// the "Routes" are listening for an event
import React from "react";
import { Route } from "react-router-dom";
import { CustomerList } from "./customers/CustomerList";
import { EmployeeForm } from "./employees/EmployeeForm";
import { EmployeeList } from "./employees/EmployeeList";
import { Ticket } from "./servedTickets/Ticket";
import { TicketForm } from "./servedTickets/TicketForm";
import { TicketList } from "./servedTickets/TicketList";
import { Employee } from "./employees/Employee";

// purpose of this component is to render the individual pages that were selected by navBar
// links, click on the links and the following gets triggered.
// Route acts sort of as an event listener that will trigger a component when a certain
// url is shown in the DOM

export const ApplicationViews = () => {
  return (
    <>
      <Route path="/customers">
        <CustomerList />
      </Route>

      <Route path="/employees/create">
        <EmployeeForm />
      </Route>

      <Route exact path="/employees">
        <EmployeeList />
      </Route>

      <Route exact path="/employees/:employeeId(\d+)">
        <Employee />
      </Route>

      <Route path="/tickets/create">
        <TicketForm />
      </Route>

      <Route exact path="/tickets">
        <TicketList />
      </Route>

      <Route exact path="/tickets/:ticketId(\d+)">
        <Ticket />
      </Route>
    </>
  );
};
