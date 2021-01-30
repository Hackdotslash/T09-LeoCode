import React, { Component } from "react";
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
    // get mails
    this.setState({
      mails: [
        { content: "abcd", time: "10:24 AM" },
        { content: "abcd", time: "10:24 AM" },
        { content: "abcd", time: "10:24 AM" },
        { content: "abcd", time: "10:24 AM" },
        { content: "abcd", time: "10:24 AM" },
        { content: "abcd", time: "10:24 AM" },
        { content: "abasdasd", time: "10:24 AM" },
      ],
    });
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="jumbotron">
            E-mail Client <small>A responsive e-mail client layout</small>
          </h1>
        </div>
        <div className="container pb-mail-template1">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <nav className="navbar navbar-default pb-mail-navbar">
                  <div className="container-fluid">
                    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                    <div className="navbar-header">
                      <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <p className="navbar-brand" id="brand">
                        Hello, <u>Obama!</u>
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="row">
                <div className="col-md-2" id="column-resize">
                  <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                  >
                    <button
                      id="btn_email"
                      className="btn btn-danger"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      New E-mail
                    </button>
                    <div className="sui-treeview">
                      <div id="treeview" style={{ display: "none" }}></div>
                      <ul
                        className="sui-treeview-list"
                        tabindex="0"
                        role="tree"
                      >
                        <li
                          className="sui-treeview-item sui-unselectable"
                          role="treeitem"
                          aria-describedby="shielddw"
                        >
                          <div className="sui-treeview-item-content">
                            <span
                              className="sui-treeview-item-toggle"
                              style={{ visibility: "hidden" }}
                            >
                              <span className="sui-treeview-item-toggle-collapsed"></span>
                            </span>
                            <span
                              className="sui-treeview-item-text"
                              id="shielddw"
                            >
                              <span className="sui-treeview-item-icon fa fa-envelope"></span>
                              Inbox
                            </span>
                          </div>
                          <ul
                            className="sui-treeview-list sui-treeview-item-list"
                            role="group"
                            style={{ display: "none" }}
                          ></ul>
                        </li>
                        <li
                          className="sui-treeview-item sui-unselectable"
                          role="treeitem"
                          aria-describedby="shielddx"
                        >
                          <div className="sui-treeview-item-content">
                            <span
                              className="sui-treeview-item-toggle"
                              style={{ visibility: "hidden" }}
                            >
                              <span className="sui-treeview-item-toggle-collapsed"></span>
                            </span>
                            <span
                              className="sui-treeview-item-text"
                              id="shielddx"
                            >
                              <span className="sui-treeview-item-icon fa fa-book"></span>
                              Sent Mail
                            </span>
                          </div>
                          <ul
                            className="sui-treeview-list sui-treeview-item-list"
                            role="group"
                            style={{ display: "none" }}
                          ></ul>
                        </li>
                        <li
                          className="sui-treeview-item sui-unselectable"
                          role="treeitem"
                          aria-describedby="shielddy"
                        >
                          <div className="sui-treeview-item-content">
                            <span
                              className="sui-treeview-item-toggle"
                              style={{ visibility: "hidden" }}
                            >
                              <span className="sui-treeview-item-toggle-collapsed"></span>
                            </span>
                            <span
                              className="sui-treeview-item-text"
                              id="shielddy"
                            >
                              <span className="sui-treeview-item-icon fa fa-exclamation-triangle"></span>
                              Spam
                            </span>
                          </div>
                          <ul
                            className="sui-treeview-list sui-treeview-item-list"
                            role="group"
                            style={{ display: "none" }}
                          ></ul>
                        </li>
                        <li
                          className="sui-treeview-item sui-unselectable"
                          role="treeitem"
                          aria-describedby="shielddz"
                        >
                          <div className="sui-treeview-item-content">
                            <span
                              className="sui-treeview-item-toggle"
                              style={{ visibility: "hidden" }}
                            >
                              <span className="sui-treeview-item-toggle-collapsed"></span>
                            </span>
                            <span
                              className="sui-treeview-item-text"
                              id="shielddz"
                            >
                              <span className="sui-treeview-item-icon fa fa-trash-o"></span>
                              Trash
                            </span>
                          </div>
                          <ul
                            className="sui-treeview-list sui-treeview-item-list"
                            role="group"
                            style={{ display: "none" }}
                          ></ul>
                        </li>
                        <li
                          className="sui-treeview-item sui-unselectable"
                          role="treeitem"
                          aria-describedby="shieldea"
                          aria-expanded="false"
                        >
                          <div className="sui-treeview-item-content">
                            <span className="sui-treeview-item-toggle">
                              <span className="sui-treeview-item-toggle-collapsed"></span>
                            </span>
                            <span
                              className="sui-treeview-item-text"
                              id="shieldea"
                            >
                              <span className="sui-treeview-item-icon fa fa-info"></span>
                              More
                            </span>
                          </div>
                          <ul
                            className="sui-treeview-list sui-treeview-item-list"
                            role="group"
                            style={{ display: "none" }}
                          ></ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row" id="row_style">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <div className="row">
                          <div className="col-xs-4 col-md-4">
                            <p id="inbox_parag">INBOX</p>
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
                          <div className="col-xs-9 col-md-10">
                            <div className="btn-group">
                              <p
                                data-toggle="dropdown"
                                className="btn btn-warning btn-md"
                                aria-expanded="false"
                              >
                                All
                                <i className="fa fa-angle-down "></i>
                              </p>
                              <ul className="dropdown-menu">
                                <li>
                                  <p>None</p>
                                </li>
                                <li>
                                  <p>Read</p>
                                </li>
                                <li>
                                  <p>Unread</p>
                                </li>
                              </ul>
                              <p className="btn btn-warning">
                                <i className=" fa fa-refresh fa-lg"></i>
                              </p>
                            </div>
                            <div className="btn-group">
                              <p
                                data-toggle="dropdown"
                                className="btn btn-warning btn-md"
                                aria-expanded="false"
                              >
                                More
                                <i className="fa fa-angle-down "></i>
                              </p>
                              <ul className="dropdown-menu">
                                <li>
                                  <p>Mark all as read</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-xs-3 col-md-2">
                            <div className="btn-group pull-right">
                              <p
                                data-toggle="dropdown"
                                className="btn btn-primary"
                                aria-expanded="false"
                              >
                                <i className="fa fa-cog"></i>
                              </p>
                              <ul className="dropdown-menu">
                                <li>
                                  <p>Comfortable</p>
                                </li>
                                <li>
                                  <p>Cozy</p>
                                </li>
                                <li>
                                  <p>Compact</p>
                                </li>
                                <li>
                                  <p>Configure inbox</p>
                                </li>
                              </ul>
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
                                <col style={{ width: "2em" }} />
                                <col style={{ width: "2em" }} />
                                <col style={{ width: "17em" }} />
                                <col style={{ width: "2em" }} />
                                <col style={{ width: "6em" }} />
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
                                      Subject
                                    </p>
                                  </th>
                                  <th
                                    data-field="attach"
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
                                    data-field="date"
                                    role="columnheader"
                                    tabindex="-1"
                                    className="sui-headercell"
                                  >
                                    <p
                                      className="sui-link sui-unselectable"
                                      unselectable="on"
                                      tabindex="-1"
                                    >
                                      Delivered
                                    </p>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="sui-hide">
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="sui-gridcontent">
                            <table className="sui-table sui-hover sui-selectable">
                              <colgroup>
                                <col style={{ width: "2em" }} />
                                <col style={{ width: "2em" }} />
                                <col style={{ width: "17em" }} />
                                <col style={{ width: "2em" }} />
                                <col style={{ width: "6em" }} />
                              </colgroup>
                              <tbody>
                                {this.state.mails.length &&
                                  this.state.mails.map((mail) => (
                                    <Email
                                      content={mail.content}
                                      time={mail.time}
                                    ></Email>
                                  ))}
                                <tr className="sui-row" role="row">
                                  <td
                                    style={{ textAlign: "center" }}
                                    role="gridcell"
                                    tabindex="-1"
                                    className="sui-cell"
                                  >
                                    <input type="checkbox" />
                                  </td>
                                  <td
                                    style={{ textAlign: "center" }}
                                    role="gridcell"
                                    tabindex="-1"
                                    className="sui-cell"
                                  >
                                    <span className="fa fa-envelope"></span>
                                  </td>
                                  <td
                                    role="gridcell"
                                    tabindex="-1"
                                    className="sui-cell"
                                  >
                                    Class starting
                                  </td>
                                  <td
                                    style={{ textAlign: "center" }}
                                    role="gridcell"
                                    tabindex="-1"
                                    className="sui-cell"
                                  >
                                    <span className="fa fa-paperclip"></span>
                                  </td>
                                  <td
                                    role="gridcell"
                                    tabindex="-1"
                                    className="sui-cell"
                                  >
                                    9:27 AM
                                  </td>
                                </tr>
                              </tbody>
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
}

export default Inbox;
