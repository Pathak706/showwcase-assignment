import React, { useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootStore";
import { add_name, edit_name, delete_name } from "../../store/home/homeActions";
import { Dispatch } from "redux";
import { IHome } from "../../store/home/models/home";

import { MainWrapper } from "../common/container";
import Buttons from "../common/buttons";
import Input from "../common/input";

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
    <MainWrapper>
      <p>Hi there! Welcome to your education showcase</p>
      <p>Type your name and click "Enter" below to begin</p>
      <br />
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Your Name"
        onChange={handleChange}
        defaultValue={props.name}
        margin={"2em"}
      />
      <br />
      <Buttons primary={true} fontSize={20} onClick={handleSubmit}>
        Enter
      </Buttons>
    </MainWrapper>
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
