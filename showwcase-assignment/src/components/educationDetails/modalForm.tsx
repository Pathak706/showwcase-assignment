import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  add_education,
  edit_education,
} from "../../store/educationDetails/educationDetailsActions";
import { IEducationDetails } from "../../store/educationDetails/models/educationDetails";
import { AppState } from "../../store/rootStore";

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

  static getDerivedStateFromProps(
    props: IModalProps,
    state: IModalState
  ): IModalState {
    const nextState = Object.assign({}, state, { ...props.educationDetails });
    return nextState;
  }

  closeModal = (e: any) => {
    e.stopPropagation();
    this.props.closeModal();
  };

  resetState = () => {
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let obj: any = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  };

  handleSubmit = () => {
    let educations = [...this.props.education, this.state];
    console.log(educations);
    let res = this.props.add(educations);
    if (res) {
      this.props.closeModal();
      this.resetState();
    }
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

          <div className="modal-flex">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name of school"
                  name="name_of_school"
                  id="name_of_school"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Degree"
                  name="degree"
                  id="degree"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Field of study"
                  name="field_of_study"
                  id="field_of_study"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="grade"
                  name="grade"
                  id="grade"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="description"
                  name="description"
                  id="description"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="month"
                  name="start_year"
                  id="start_year"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="month"
                  name="end_year"
                  id="end_year"
                  onChange={this.handleChange}
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
  edit: (payload: IEducationDetails) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: (payload: IEducationDetails[]) => dispatch(add_education(payload)),
  edit: (payload: IEducationDetails) => dispatch(edit_education(payload)),
});

const mapStateToProps = (state: AppState) => ({
  education: state.education,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
