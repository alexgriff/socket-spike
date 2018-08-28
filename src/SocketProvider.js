import React, { Component } from 'react'
import { Socket } from 'phoenix'
import SocketContext from './SocketContext'

 class SocketProvider extends Component {
  constructor(props) {
    super(props)
    this.socket = new Socket(props.wsUrl, {
      params: { token: "<token>" }
    })
  }

  componentWillMount() {
    this.socket.connect()
  }

   render() {
     return (
       <SocketContext.Provider value={this.socket}>
         { this.props.children }
       </SocketContext.Provider>
     )
   }
 }

 export default SocketProvider
