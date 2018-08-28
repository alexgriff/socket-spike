import React, { Component } from 'react'
import SocketContext from './SocketContext'

class SocketChannel extends Component {
  constructor() {
    super()
    this.channel = null
  }


  render() {
    const { channel, onMessage, children } = this.props

    return (
      <SocketContext.Consumer>
        {
          connection => {
            if (!this.channel) {
              this.channel = connection.channel(channel, {client: 'browser'})

              connection.onMessage(({ event, topic, payload }) => {
                if (topic === channel) {
                  onMessage({ event, payload })
                }
              })

              this.channel.join()
              .receive("ok", ({messages}) => console.log("success", messages) )
              .receive("error", ({reason}) => console.log("failed join", reason) )
            }

            /* Inject any child components with the channel as a prop */
            /* ex: `this.props.channel.push('event_name', payload)` */
            return React.Children.map(
              children,
              child => React.cloneElement(child, { channel: this.channel })
            )
          }
        }
      </SocketContext.Consumer>
    )
  }
}

export default SocketChannel
