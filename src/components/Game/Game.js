import React, { Component } from "react";
import Choices from "./Choices";
import { STARTING_GAME, CHOOSED_ITEM, RESULT, TIMER } from "../utils/Envents";

class Game extends Component {
  constructor(props) {
    super(props);
    this.intervals = [];
    this.state = {
      start: false,
      submitted: false,
      selectedOption: "rock",
      result: null,
      countDown: 10
    };
  }

  componentDidMount() {
    this.socket();
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.submitWeapon();
  };

  submitWeapon = () => {
    const { submitted, selectedOption } = this.state;
    const { socket, user } = this.props;
    if (!submitted) {
      const choice = selectedOption;
      socket.emit(CHOOSED_ITEM, user, choice);
      this.setState({ submitted: true });
    }
  };

  handleOnChange(e) {
    this.setState({ selectedOption: e.target.value });
  }

  socket = () => {
    const { socket } = this.props;
    socket.on(STARTING_GAME, () => {
      this.setState({
        start: true,
        result: null,
        submitted: false
      });
    });

    socket.on(TIMER, countDown => {
      this.setState({ countDown });

      this.intervals.forEach(interval => {
        clearInterval(interval);
      });

      let myInterval = setInterval(() => {
        this.setState(prevState => ({
          countDown: prevState.countDown - 1
        }));
        if (this.state.countDown <= 0) {
          clearInterval(myInterval);
          if (!this.state.submitted) this.submitWeapon();
        }
      }, 1000);

      this.intervals.push(myInterval);
    });

    socket.on(RESULT, result => {
      this.setState({ result, start: false });
    });
  };

  render() {
    const { start, result, countDown, submitted, selectedOption } = this.state;

    const choices = [
      { value: "rock" },
      { value: "paper" },
      { value: "scissors" }
    ];

    return (
      <div>
        <div>
          <h3>
            {result
              ? `نتیجه بازی : ${result}`
              : start
              ? "انتخاب کنید"
              : "منتظر حریف باشید"}
          </h3>
          <h3>{start && <div>تایمر {countDown}</div>}</h3>
        </div>
        <div>
          <Choices
            options={choices}
            onChange={e => this.handleOnChange(e)}
            selected={selectedOption}
          />
          <button
            type="submit"
            className={`btn btn-primary ${
              !start && !submitted ? "disabled" : ""
            }`}
            onClick={this.handleSubmit}
          >
            بزن بریم
          </button>
        </div>
        <hr />
        <p>فرزاد شامی - تابستان ۱۳۹۸</p>
        <p>
          <a href="https://github.com/FaRzad-845">گیت هاب</a>
          {"، "}
          <a href="virgool.io/@farzadshami">ویرگول</a>
        </p>
      </div>
    );
  }
}

export default Game;
