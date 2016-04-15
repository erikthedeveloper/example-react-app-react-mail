import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { AppLayout } from './../AppLayout';

/**
 * The top level App component!
 */
export const App = React.createClass({

  getInitialState() {
    return {
      messages: [],
    };
  },

  setMessages(messages) {
    this.setState({messages});
  },

  /**
   * PATCH messages/:id - Toggle a message's flagged state.
   * @param id
   */
  toggleMessageFlagged(id) {
    const message = _.find(this.state.messages, {id: Number(id)});
    const flagged = !message.flagged;

    axios.patch(`messages/${id}`, {flagged})
      .then(() => this.setState({
        messages: this.state.messages
          .map(message => message.id !== id
            ? message
            : {...message, flagged}
          )
        })
      );
  },

  /**
   * DELETE messages/:id - Delete a message.
   * @param id
   */
  deleteMessage(id) {
    axios.delete(`messages/${id}`)
      .then(() => this.setState({
        messages: this.state.messages
          .filter(message => message.id !== id)
      }));
  },

  render() {
    const childProps = {
      ...this.state,
      setMessages: this.setMessages,
      deleteMessage: this.deleteMessage,
      toggleMessageFlagged: this.toggleMessageFlagged,
    };

    return (
      <AppLayout>
        {React.Children.map(
          this.props.children,
          child => React.cloneElement(child, childProps)
        )}
      </AppLayout>
    );
  }
});
