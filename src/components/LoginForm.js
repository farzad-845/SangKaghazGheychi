import React, { Component } from "react";
import { VERIFY_USER } from "./utils/Envents";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      nickname: "",
      error: ""
    };
  }

  setUser = ({ user, isUser, error = "UserName taken" }) => {
    if (isUser) {
      this.setError(error);
    } else {
      this.props.setUser(user);
      this.setError("");
    }
  };

  handleSumbit = evt => {
    evt.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;

    this._isMounted && socket.emit(VERIFY_USER, nickname, this.setUser);
  };

  handleChange = evt => {
    this._isMounted &&
      this.setState({
        nickname: evt.target.value
      });
  };

  setError = error => {
    this._isMounted &&
      this.setState({
        error
      });
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          <div className="form-group">
            <div>
              <label htmlFor="nickname">انتخاب نام مستعار برای بازی </label>
            </div>
            <input
              dir="rtl"
              type="text"
              ref={input => {
                this.textInput = input;
              }}
              id="nickname"
              value={nickname}
              onChange={this.handleChange}
              placeholder="گلابی"
              aria-describedby="error"
            />
            <small id="error" className="form-text text-muted">
              {error ? error : null}
            </small>
          </div>
          <button onClick={this.handleSumbit} className="btn btn-primary">
            وارد شو
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
