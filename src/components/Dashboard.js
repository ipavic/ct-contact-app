import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Dashboard = (props) => {
  const [contacts, setContacts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // const [isSubmitSuccess, setIsSubmitSuccess] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState("");
  
  const [filteredData, setFilteredData] = useState(contacts);

  const loadContacts = async (limit) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/contacts?_limit=${limit}`
      );
      console.log(response.data);
      setContacts(response.data);
      // setFilteredData(response.data);
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = contacts.filter((data) => {
      return data.category.search(value) != -1;
    });
    console.log(result);
    // setContacts(result);
    setFilteredData(result);
  };

  useEffect(() => {
    loadContacts(contacts.length + 3);
  }, []);
  
  function handleClick() {
    loadContacts(contacts.length + 3);
  }

  function deleteContact(id) {
    axios.delete(`http://localhost:5000/contacts/${id}`).then(() => {
      const index = contacts.findIndex((contact) => contact.id === id);
      contacts.splice(index, 1);
      props.history.push("/");
    });
  }

  return (
    <div>
      {contacts.length === 0 && (
        <div className="text-center">
          <h2>No contact found in the database</h2>
        </div>
      )}

      <div className="container">
        <h2>The CT Contacts Management App</h2>
        <div className="form-group row mt-5">
          <label htmlFor="filter" className="col-sm-4 col-form-label">
            Filter by category:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="filter"
              onChange={(e) => handleSearch(e)}
              name="filter"
              placeholder="Enter category term"
            />
          </div>
        </div>
        <div className="row table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Category</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.surname}</td>
                    <td>{contact.email}</td>
                    <td>{contact.category}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="btn-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Link
                            to={`edit/${contact.id}`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => deleteContact(contact.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

              {contacts &&
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.surname}</td>
                    <td>{contact.email}</td>
                    <td>{contact.category}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="btn-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Link
                            to={`edit/${contact.id}`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => deleteContact(contact.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleClick}
          >
            Load more contacts...
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
