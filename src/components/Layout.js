import React, { Component } from "react";
import LoginForm from "./LoginForm";
import io from "socket.io-client";
import Game from "./Game/Game";

const socketUrl = "https://snapp.liara.run/";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  initSocket = () => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      console.log("connected");
    });

    this.setState({
      socket
    });
  };

  componentDidMount() {
    this.initSocket();
  }

  setUser = user => {
    const { socket } = this.state;
    socket.emit("USER_CONNECTED", user);
    this.setState({ user });
  };

  render() {
    const { socket, user } = this.state;
    return (
      <div>
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          <Game socket={socket} user={user} />
        )}
      </div>
    );
  }
}

export default Layout;
