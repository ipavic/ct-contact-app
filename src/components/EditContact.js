import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      contact: {},
      values: [],
      loading: false,
      submitSuccess: false,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/contacts/${this.state.id}`)
      .then((response) => {
        this.setState({ contact: response.data });
      });
  }

  processFormSubmission = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .patch(
        `http://localhost:5000/contacts/${this.state.id}`,
        this.state.values
      )
      .then(() => {
        this.setState({ submitSuccess: true, loading: false });
        setTimeout(() => {
          this.props.history.push("/");
        }, 1500);
      });
  };

  setValues = (values) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  handleInputChanges = (e) => {
    e.preventDefault();
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className="App">
        {this.state.contact && (
          <div>
            <div className={"col-md-12 form-wrapper"}>
              <h2> Edit Contact Details </h2>

              {submitSuccess && (
                <div className="alert alert-info" role="alert">
                  Person details has been edited successfully{" "}
                </div>
              )}

              <form
                id={"create-post-form"}
                onSubmit={this.processFormSubmission}
                noValidate={true}
              >
                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      defaultValue={this.state.contact.name}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="name"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="surname" className="col-sm-2 col-form-label">
                    Surname:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      defaultValue={this.state.contact.surname}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="surname"
                      placeholder="Enter surname"
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      defaultValue={this.state.contact.email}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="email"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="category" className="col-sm-2 col-form-label">
                    Category:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      defaultValue={this.state.contact.category}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="category"
                      placeholder="Enter category"
                      required
                    />
                  </div>
                </div>

                <div className="form-group col-md-8 pull-right">
                  <button className="btn btn-success mr-2" type="submit">
                    Update Contact
                  </button>{" "}
                  or{" "}
                  <Link
                    to="/"
                    className="btn btn-light"
                  >
                    Cancel
                  </Link>
                  {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditContact);
