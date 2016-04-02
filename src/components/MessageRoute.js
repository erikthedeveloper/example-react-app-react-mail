import React from 'react';
import { Message } from './Message';

export const MessageRoute = React.createClass({

  contextTypes: {
    router: React.PropTypes.object,
  },

  componentDidUpdate(prevProps) {
    const hadMessage = this.getMessage(prevProps);
    const hasMessage = this.getMessage(this.props);
    if (hadMessage && !hasMessage) {
      this.context.router.push('/');
    }
  },

  getMessage({messages, params: {id}}) {
    const messageId = Number(id);
    return messages
      .filter(message => message.id === messageId)[0]
  },

  render() {
    const message = this.getMessage(this.props);

    if (!message) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <Message
        message={message}
        {...this.props}
      />
    )
  },
});
