import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import SocketProvider from './SocketProvider';

const Root = () => {
  return (
    <SocketProvider wsUrl='ws://0.0.0.0:4000/socket'>
      <App />
    </SocketProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
