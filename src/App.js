import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketChannel from './SocketChannel'


const ClickMe = ({channel}) => {
  return (
    <button onClick={() => channel.push('alex_event', 'blahh')}>
      Click Me!
    </button>
  )
}


class App extends Component {
  state = {
    text: ''
  }

  handleSocketResponse = ({ event, payload }) => {
    switch (event) {
      case 'alex_event':
        this.setState(prevState => ({
          text: `${prevState.text}${payload.msg}`
        }))
      default:
        console.log({ event })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{this.state.text}</p>

        <SocketChannel
          channel='alex'
          onMessage={this.handleSocketResponse}
        >
          <ClickMe />
        </SocketChannel>
      </div>
    );
  }
}

export default App;
