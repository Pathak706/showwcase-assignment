import React, { Component } from "react";
import ModalForm from "../components/educationDetails/modalForm";
import { connect } from "react-redux";
import { AppState } from "../store/rootStore";
import { Dispatch } from "redux";

import "./education.scss";
import { IEducationDetails } from "../store/educationDetails/models/educationDetails";
import { delete_education } from "../store/educationDetails/educationDetailsActions";
import Buttons from "../components/common/buttons";

declare global {
  interface Array<T> {
    removeAndReorder(elem: number): Array<T>;
  }
}

if (!Array.prototype.removeAndReorder) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.removeAndReorder = function <T>(elem: number): T[] {
    this.splice(elem, 1);
    // eslint-disable-next-line array-callback-return
    this.map((arr, index) => {
      arr.index = index;
    });
    return this;
  };
}
export class EducationDetails extends Component<
  IEducationDetailsProps,
  IEducationDetailsState
> {
  state: IEducationDetailsState = {
    modalOpen: false,
    educationDetails: {
      name_of_school: "",
      degree: "",
      field_of_study: "",
      start_year: "",
      end_year: "",
      grade: "",
      description: "",
    },
  };

  handleModelChange = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      educationDetails: {
        name_of_school: "",
        degree: "",
        field_of_study: "",
        start_year: "",
        end_year: "",
        grade: "",
        description: "",
      },
    });
  };

  editEducationDetails = (educationDetails: IEducationDetails) => {
    this.setState({ modalOpen: true, educationDetails });
  };

  deleteEducationDetails = (educationDetails: IEducationDetails) => {
    const prevState = this.props.education.removeAndReorder(
      educationDetails.index as number
    );
    this.props.delete(prevState);
  };

  render() {
    return (
      <>
        <div className="greetings">
          <p>Welcome to {this.props.name}'s education page</p>
          <br />
          <Buttons
            primary={true}
            onClick={this.handleModelChange}
          >
            Add New Education
          </Buttons>
        </div>

        {this.props.education.length > 0 ? (
          <div className="education-wrapper">
            <div className="sidebar">
              <ul className="education-title-list">
                {this.props.education.map((edu, index) => (
                  <li
                    className="education-title-item"
                    key={index}
                    onClick={() => this.editEducationDetails(edu)}
                  >
                    <p>
                      <strong>{edu.name_of_school}</strong>
                      <br />
                      <span>
                        {edu.start_year} to {edu.end_year}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="education-details-list">
              <ul className="education-list">
                {this.props.education.reverse().map((edu, index) => (
                  <li className="education-title-item" key={index}>
                    <div className="education-details">
                      <p>
                        {edu.name_of_school}&nbsp;@&nbsp;
                        <strong>{edu.degree}</strong>
                        <span className="action-btn">
                          <Buttons warning={true} onClick={() => this.editEducationDetails(edu)}>Edit</Buttons>
                          <Buttons danger={true} onClick={() => this.deleteEducationDetails(edu)}>Delete</Buttons>
                        </span>
                        <br />
                        <span>
                          {edu.start_year} to {edu.end_year}
                        </span>
                      </p>
                      <span>Grade:- {edu.grade}</span>
                      <p>{edu.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="no-list" style={{ textAlign: "center" }}>
            <p>Please add your education details</p>
          </div>
        )}

        <ModalForm
          name={this.props.name}
          displayModal={this.state.modalOpen}
          closeModal={this.handleModelChange}
          educationDetails={this.state.educationDetails}
        />
      </>
    );
  }
}

interface IEducationDetailsState {
  modalOpen: boolean;
  educationDetails: IEducationDetails;
}

interface IDispatchProps {
  delete: (
    payload: IEducationDetails[]
  ) => {
    type: string;
    payload: IEducationDetails[];
  };
}

interface IEducationDetailsProps extends IDispatchProps {
  name: string;
  education: IEducationDetails[];
}

const mapStateToProps = (state: AppState) => ({
  name: state.home.name,
  education: state.education,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  delete: (payload: IEducationDetails[]) => dispatch(delete_education(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EducationDetails);
