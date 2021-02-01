import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  add_education,
  edit_education,
} from "../../store/educationDetails/educationDetailsActions";
import { IEducationDetails } from "../../store/educationDetails/models/educationDetails";
import { AppState } from "../../store/rootStore";
import "./modalForm.scss";
declare var window: any;
class ModalForm extends Component<IModalProps, IModalState> {
  state: IModalState = {
    name_of_school: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    grade: "",
    description: "",
    index: 0,
  };

  componentWillReceiveProps(nextProps: IModalProps) {
    if (
      nextProps.educationDetails &&
      nextProps.educationDetails.name_of_school
    ) {
      var nextState = Object.assign({}, this.state, {
        ...nextProps.educationDetails,
      });
      this.setState({ ...nextState });
    }
  }

  closeModal = (e: any) => {
    e.stopPropagation();
    this.resetState();
    this.props.closeModal();
  };

  resetState = () => {
    window.document.getElementById("eduForm").reset();
    this.setState({
      name_of_school: "",
      degree: "",
      field_of_study: "",
      start_year: "",
      end_year: "",
      grade: "",
      description: "",
      index: 0,
    });
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let obj: any = {};
    obj[e.target.id] = e.target.value;
    this.setState({ ...obj });
  };

  handleSubmit = () => {
    let currentObj = Object.assign({}, this.state, {
      index: this.props.education.length,
    });
    var res = null;
    if (
      this.props.educationDetails &&
      this.props.educationDetails.name_of_school
    ) {
      let prevState = this.props.education;
      prevState[this.props.educationDetails.index as number] = {
        ...this.state,
      };
      res = this.props.edit(prevState);
    } else {
      let educations = [...this.props.education, currentObj];
      res = this.props.add(educations);
    }
    if (!res) {
      alert("Something Went Wrong!");
    }
    this.props.closeModal();
    this.resetState();
  };

  render() {
    return (
      <div
        className="modal"
        onClick={this.closeModal}
        style={{ display: this.props.displayModal ? "block" : "none" }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={this.closeModal}>
            &times;
          </span>
          <p>Add New Education</p>

          <div className="modal-flex">
            <form id="eduForm">
              <div className="form-group">
                Name Of School:
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name of school"
                  name="name_of_school"
                  id="name_of_school"
                  onChange={this.handleChange}
                  defaultValue={this.state.name_of_school}
                />
              </div>
              <div className="form-group">
                Degree:
                <input
                  type="text"
                  className="form-control"
                  placeholder="Degree"
                  name="degree"
                  id="degree"
                  onChange={this.handleChange}
                  defaultValue={this.state.degree}
                />
              </div>
              <div className="form-group">
                Field Of Study:
                <input
                  type="text"
                  className="form-control"
                  placeholder="Field of study"
                  name="field_of_study"
                  id="field_of_study"
                  onChange={this.handleChange}
                  defaultValue={this.state.field_of_study}
                />
              </div>
              <div className="form-group">
                Grade:
                <input
                  type="text"
                  className="form-control"
                  placeholder="grade"
                  name="grade"
                  id="grade"
                  onChange={this.handleChange}
                  defaultValue={this.state.grade}
                />
              </div>
              <div className="form-group">
                Description:
                <textarea
                  className="form-control"
                  placeholder="description"
                  name="description"
                  id="description"
                  rows={5}
                  onChange={this.handleChange}
                  defaultValue={this.state.description}
                />
              </div>
              <div className="form-group">
                Start Month & Year:
                <input
                  type="month"
                  name="start_year"
                  id="start_year"
                  onChange={this.handleChange}
                  defaultValue={this.state.start_year}
                />
              </div>
              <div className="form-group">
                End Month & Year:
                <input
                  type="month"
                  name="end_year"
                  id="end_year"
                  onChange={this.handleChange}
                  defaultValue={this.state.end_year}
                />
              </div>
              <button type="button" onClick={this.handleSubmit}>
                Save
              </button>
              <button type="button" onClick={this.closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

interface IModalState {
  name_of_school: string;
  degree: string;
  field_of_study: string;
  start_year: string;
  end_year: string;
  grade: string;
  description: string;
  index?: number;
}

interface IModalProps extends IDispatchProps {
  name: string;
  closeModal: () => void;
  displayModal: boolean;
  educationDetails?: IEducationDetails;
  education: IEducationDetails[];
}

interface IDispatchProps {
  add: (
    payload: IEducationDetails[]
  ) => {
    type: string;
    payload: IEducationDetails[];
  };
  edit: (
    payload: IEducationDetails[]
  ) => {
    type: string;
    payload: IEducationDetails[];
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: (payload: IEducationDetails[]) => dispatch(add_education(payload)),
  edit: (payload: IEducationDetails[]) => dispatch(edit_education(payload)),
});

const mapStateToProps = (state: AppState) => ({
  education: state.education,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
