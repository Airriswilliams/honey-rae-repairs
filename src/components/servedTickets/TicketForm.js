import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const TicketForm = () => {
  const [ticket, updateTicket] = useState({
    // initial state is an object that has initial values of each one of the properties
    // for each one of the form fields "description & emergency"
    description: "",
    emergency: false,
    // these two state variables will be updated as user interacts with form
  });

  const history = useHistory();
  // once Submit Ticket button is clicked, we need a function to perform Post operation
  // function that uses state variable to create a new obj to post to API
  const submitTicket = (event) => {
    event.preventDefault();
    const newTicket = {
      description: ticket.description,
      emergency: ticket.emergency,
      //pull FK of customerId from local storage and add it to the new obj to be submitted
      customerId: parseInt(localStorage.getItem("honey_customer")),
      // hardcode employeeId 1 to prevent JSON server from deleting data
      employeeId: 1,
      dateCompleted: "",
    };
    event.preventDefault();
    // send newTicket obj to API
    const fetchOption = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      // save the body of the request which is the newTicket obj
      body: JSON.stringify(newTicket),
    };

    return fetch("http://localhost:8088/serviceTickets", fetchOption).then(
      () => {
        history.push("/tickets");
      }
    );
  };
  // now create the actual form the user will use
  return (
    <form className="ticketForm">
      <h2 className="ticketForm__title">New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            // onChange is an event listener to update description property in my state
            onChange={
              // all event listeners we capture the (event) that's passed as an argument by the browser
              (evt) => {
                // use setter function to change state, 1. copy the existing state by using the spread operator
                // copy variable is now a brand new obj with all the values copied from our state
                const copy = { ...ticket };
                //modify the copy i.e. change the description from a blank string "" to whatever has been typed in
                copy.description = evt.target.value;
                //now that the copy is updated, the copy becomes the new state
                updateTicket(copy);
              }
            }
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Emergency:</label>
          <input
            type="checkbox"
            onChange={(evt) => {
              const copy = { ...ticket };
              // "checked" is seeing whether the emergency box is checked or not
              copy.emergency = evt.target.checked;
              updateTicket(copy);
            }}
          />
        </div>
      </fieldset>
      <button onClick={submitTicket} className="btn btn-primary">
        Submit Ticket
      </button>
    </form>
  );
};
