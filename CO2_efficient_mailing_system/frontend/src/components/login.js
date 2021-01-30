import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail = (e) => this.setState({ email: e.target.value });
  onChangePassword = (e) => this.setState({ password: e.target.value });

  validate(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("email", this.state.email);
        localStorage.setItem("password", this.state.password);
        window.location = "/go";
      })
      .catch((err) => {
        alert("wrong email or password!");
      });
  }

  render() {
    return (
      <div style={{ width: "30%" }} className="container">
        <form>
          <h3 className="blockquote">
            Enter your Email and Password to continue
          </h3>
          <br />
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChangeEmail.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChangePassword.bind(this)}
            />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
            </div>
          </div>
          <button
            onClick={this.validate.bind(this)}
            className="btn btn-primary btn-block"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
