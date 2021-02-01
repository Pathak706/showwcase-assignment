import React, { useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootStore";
import { add_name, edit_name, delete_name } from "../../store/home/homeActions";
import { Dispatch } from "redux";
import { IHome } from "../../store/home/models/home";
function WelcomeForm(props: IWelcomeFormProps) {
  const [name, setname] = useState(props.name || "");
  const handleSubmit = () => {
    const res = props.addname(name);
    if (res) {
      window.location.href = "/education";
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  return (
    <div
      className="content-wrapper"
      style={{ textAlign: "center", margin: "200px auto" }}
    >
      <p>Hi there! Welcome to your education showcase</p>
      <br />
      <p>Type your name and click "Enter" below to begin</p>
      <br />
      <input
        type="text"
        placeholder="Your Name"
        defaultValue={name}
        id="name"
        name="name"
        onChange={handleChange}
        style={{ padding: "10px", width: "200px" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px",
          width: "80px",
          margin: "20px",
          background: "blue",
          color: "#fff",
          fontSize: "20px"
        }}
      >
        Enter
      </button>
    </div>
  );
}

interface IDispatchProps {
  addname: (name: string) => { type: string; payload: IHome };
  edit: (name: string) => void;
  delete: () => void;
}

interface IWelcomeFormProps extends IDispatchProps {
  name: string;
}

const mapStateToProps = (state: AppState) => ({
  name: state.home.name,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  addname: (name: string) => dispatch(add_name({ name })),
  edit: () => (name: string) => dispatch(edit_name({ name })),
  delete: () => () => dispatch(delete_name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeForm);
