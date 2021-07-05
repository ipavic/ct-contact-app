import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      category: '',
      values: [],
      loading: false,
      submitSuccess: false,
    }
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const formData = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      category: this.state.category,
    }

    this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

    axios.post(`http://localhost:5000/contacts`, formData).then(() => [
      setTimeout(() => {
        this.props.history.push('/');
      }, 1000)
    ]);
  }

    handleInputChanges = (e) => {
      e.preventDefault();
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
      })
    }

    render() {
        const { submitSuccess, loading } = this.state;
        return (
          <div>
            <div className={"col-md-12 form-wrapper"}>
              <h2>Add New Contact</h2>

              {submitSuccess && (
                <div className="alert alert-info" role="alert">
                  New contact {this.state.name} {this.state.surname} is
                  successfully created!
                </div>
              )}

              <form onSubmit={this.handleFormSubmission} noValidate={false}>
                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                    Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
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
                      onChange={(e) => this.handleInputChanges(e)}
                      name="category"
                      placeholder="Enter category"
                      required
                    />
                  </div>
                </div>

                <div className="form-group col-md-8 pull-right">
                  <button className="btn btn-success mr-2" type="submit">
                    Add New Contact
                  </button>{" "}
                  or{" "}
                  <Link to="/" className="btn btn-light">
                    Cancel
                  </Link>
                  {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                </div>
              </form>
            </div>
          </div>
        );
    }
}

export default withRouter(AddContact)
