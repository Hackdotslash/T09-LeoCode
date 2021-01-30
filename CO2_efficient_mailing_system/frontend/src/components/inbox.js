import React, { Component } from "react";
import axios from "axios";
import Email from "./email";
import "../static/inbox.css";
import "../static/font-awesome/css/font-awesome.min.css";

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      mails: [],
    };
  }

  componentDidMount() {
    if (
      localStorage.getItem("email") === null ||
      localStorage.getItem("password") === null
    )
      window.location = "/login";
    else {
      axios
        .post("http://localhost:5000/getUnsubscribeList", {
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
        })
        .then((res) => {
          this.setState({ mails: res.data.data });
        })
        .catch((err) => {
          alert("something didn't go well! Please login again");
          new Promise((r) => setTimeout(r, 2000)).then(() => {
            window.location = "/login";
          });
        });
    }
  }

  render() {
    return (
      <div style={{ marginBottom: 70 }} className="container">
        <div className="container pb-mail-template1">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-default pb-mail-navbar">
                {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                <div className="navbar-header">
                  <p className="navbar-brand" id="brand">
                    Hello, <u>Obama!</u>
                  </p>
                </div>
              </nav>
              <div className="row m-5">
                <div className="col-md-10">
                  <div className="row" id="row_style">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <div className="row">
                          <div className="col-xs-4 col-md-4">
                            <p id="inbox_parag">SENDERS</p>
                          </div>
                          <div className="col-xs-8 col-md-8">
                            <div className="input-group">
                              <input
                                type="text"
                                name=""
                                placeholder="Seach...."
                                className="form-control"
                              />
                              <span className="input-group-btn">
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  tabindex="-1"
                                >
                                  <span
                                    className="fa fa-question fa-2x"
                                    area-hidden="true"
                                  ></span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-xs-3 col-md-2">
                            <div className="btn-group">
                              <p className="btn btn-primary">
                                <i>unselect</i>
                              </p>
                            </div>
                          </div>
                          <div className="col-xs-3 col-md-2">
                            <div className="btn-group">
                              <p className="btn btn-warning">
                                <i>delete</i>
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div
                          id="grid"
                          role="grid"
                          aria-readonly="true"
                          className="sui-grid sui-grid-core"
                        >
                          <div className="sui-gridheader">
                            <table className="sui-table sui-non-selectable">
                              <colgroup>
                                <col style={{ width: "8em" }} />
                                <col style={{ width: "8em" }} />
                                <col style={{ width: "50em" }} />
                              </colgroup>
                              <thead>
                                <tr role="row" className="sui-columnheader">
                                  <th
                                    data-field="check"
                                    role="columnheader"
                                    tabindex="-1"
                                    className="sui-headercell"
                                  >
                                    <p
                                      className="sui-link sui-unselectable"
                                      unselectable="on"
                                      tabindex="-1"
                                    >
                                      &nbsp;
                                    </p>
                                  </th>
                                  <th
                                    data-field="icon"
                                    role="columnheader"
                                    tabindex="-1"
                                    className="sui-headercell"
                                  >
                                    <p
                                      className="sui-link sui-unselectable"
                                      unselectable="on"
                                      tabindex="-1"
                                    >
                                      &nbsp;
                                    </p>
                                  </th>
                                  <th
                                    data-field="message"
                                    role="columnheader"
                                    tabindex="-1"
                                    className="sui-headercell"
                                  >
                                    <p
                                      className="sui-link sui-unselectable"
                                      unselectable="on"
                                      tabindex="-1"
                                    >
                                      Sender
                                    </p>
                                  </th>
                                </tr>
                              </thead>
                            </table>
                          </div>
                          <div className="sui-gridcontent">
                            <table className="sui-table sui-hover sui-selectable">
                              <colgroup>
                                <col style={{ width: "8em" }} />
                                <col style={{ width: "8em" }} />
                                <col style={{ width: "50em" }} />
                              </colgroup>
                              <tbody>{this.getMails()}</tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Modal view --> */}
              <div
                className="modal fade"
                id="myModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModal"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="row">
                        <div className="col-md-4">
                          <h5>New message</h5>
                        </div>
                        <div className="col-md-8">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group row">
                          <div className="col-md-3">
                            <p>To: </p>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="search"
                              placeholder="Enter e-mail"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-3">
                            <p>Subject: </p>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="search"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-3">
                            <p>Message: </p>
                          </div>
                          <div className="col-md-9">
                            <textarea
                              className="form-control"
                              rows="10"
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-primary pull-left"
                        id="btn_file"
                      >
                        <span className="fa fa-paperclip fa-2x"></span>
                        <input
                          type="file"
                          id="file"
                          style={{ display: "none" }}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getMails() {
    if (this.state.mails.length)
      return this.state.mails.map((mail) => (
        <Email sender={mail.sender}></Email>
      ));
    else return "No senders currently";
  }
}

export default Inbox;
