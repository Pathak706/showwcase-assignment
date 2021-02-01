import React, { Component } from "react";
// import EducationList from "../components/educationDetails/educationList";
import ModalForm from "../components/educationDetails/modalForm";
// import Sidebar from "../components/educationDetails/sidebar";
import { connect } from "react-redux";
import { AppState } from "../store/rootStore";
import { Dispatch } from "redux";

import "./education.scss";
import { IEducationDetails } from "../store/educationDetails/models/educationDetails";
export class EducationDetails extends Component<
  IEducationDetailsProps,
  IEducationDetailsState
> {
  state: IEducationDetailsState = {
    modalOpen: false,
  };

  handleModelChange = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    return (
      <>
        <div className="greetings">
          <p>Welcome to {this.props.name}'s education page</p>
          <br />
          <button onClick={this.handleModelChange}>Add new education</button>
        </div>
        <div className="education-wrapper">
          <div className="sidebar">
            <ul className="education-title-list">
              {this.props.education.length &&
                this.props.education.map((edu, index) => (
                  <li
                    className="education-title-item"
                    key={index}
                    onClick={this.handleModelChange}
                  >
                    <strong>{edu.degree}</strong>
                    <span>{edu.name_of_school}</span>
                    <span>
                      {edu.start_year} - {edu.end_year}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="education-details-list">
            <ul className="education-list">
              <li className="education-list-item">
                <div className="education-details">
                  <strong>92%</strong>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ModalForm
          name={this.props.name}
          displayModal={this.state.modalOpen}
          closeModal={this.handleModelChange}
        />
      </>
    );
  }
}

interface IEducationDetailsState {
  modalOpen: boolean;
}

interface IDispatchProps {}

interface IEducationDetailsProps extends IDispatchProps {
  name: string;
  education: IEducationDetails[];
}

const mapStateToProps = (state: AppState) => ({
  name: state.home.name,
  education: state.education,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails);
