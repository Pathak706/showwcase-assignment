import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  add_education,
  edit_education,
} from "../../store/educationDetails/educationDetailsActions";
import { IEducationDetails } from "../../store/educationDetails/models/educationDetails";
import { AppState } from "../../store/rootStore";
import Buttons from "../common/buttons";
import Input from "../common/input";
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
    autoSuggesions: [],
    showSuggesion: false,
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
      autoSuggesions: [],
      showSuggesion: false,
    });
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let obj: any = {};
    obj[e.target.id] = e.target.value;
    this.setState({ ...obj });
  };

  checkProperties(obj: any) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== "")
            return false;
    }
    return true;
}

  handleSubmit = (e: any) => {
    e.preventDefault();
    if(this.checkProperties(this.state)) {
      return alert("Please check the form you are submitting!");
    }
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

  getUniversityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name_of_school: e.target.value }, () => {
      fetch(
        `http://universities.hipolabs.com/search?name=${this.state.name_of_school}`
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({ autoSuggesions: data, showSuggesion: true })
        );
    });
  };

  selectSchoolName = (name: string) => {
    this.setState({ name_of_school: name, showSuggesion: false });
  };

  render() {
    return (
      <div
        className="modal"
        // onClick={this.closeModal}
        style={{ display: this.props.displayModal ? "block" : "none" }}
      >
        {this.state.autoSuggesions.length > 0 && this.state.showSuggesion && (
          <div className="auto-complete-name">
            <ul>
              {this.state.autoSuggesions.slice(0, 5).map((sug, index) => (
                <li key={index} onClick={() => this.selectSchoolName(sug.name)}>
                  {sug.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={this.closeModal}>
            &times;
          </span>
          <p>Add New Education</p>

          <div className="modal-flex">
            <form id="eduForm">
              <div className="form-group">
                <Input
                  type="text"
                  placeholder="Name of school"
                  name="name_of_school"
                  id="name_of_school"
                  onChange={this.getUniversityName}
                  value={this.state.name_of_school}
                  label={"Name Of School"}
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  placeholder="Degree"
                  name="degree"
                  id="degree"
                  onChange={this.handleChange}
                  defaultValue={this.state.degree}
                  label={"Degree"}
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  placeholder="Field of study"
                  name="field_of_study"
                  id="field_of_study"
                  onChange={this.handleChange}
                  defaultValue={this.state.field_of_study}
                  label={"Field of study"}
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  placeholder="Grade / CGPA"
                  name="grade"
                  id="grade"
                  onChange={this.handleChange}
                  defaultValue={this.state.grade}
                  label={"Grade"}
                />
              </div>
              <div className="form-group">
                Description
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
                <Input
                  type="month"
                  name="start_year"
                  id="start_year"
                  onChange={this.handleChange}
                  defaultValue={this.state.start_year}
                  label={"Start year and month"}
                />
              </div>
              <div className="form-group">
                <Input
                  type="month"
                  name="end_year"
                  id="end_year"
                  onChange={this.handleChange}
                  defaultValue={this.state.end_year}
                  label={"End year and month"}
                />
              </div>
              <Buttons onClick={this.handleSubmit} success={true}>
                Save
              </Buttons>
              <Buttons type="button" onClick={this.closeModal} danger={true}>
                Cancel
              </Buttons>
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
  autoSuggesions: Suggestion[];
  showSuggesion: boolean;
}

interface Suggestion {
  webpage: string;
  country: string;
  domain: string;
  name: string;
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
