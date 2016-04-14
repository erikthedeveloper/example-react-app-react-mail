import React from 'react';
import { MessageBrowser } from './../MessageBrowser';

export const MessageBrowserContainer = React.createClass({

  componentDidMount() {
    const {messages, requestMessages} = this.props;
    if (messages.length <= 1) {
      requestMessages();
    }
  },

  render() {
    return <MessageBrowser {...this.props} />;
  },
});
