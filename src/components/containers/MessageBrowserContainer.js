import React from 'react';
import { MessageBrowser } from './../MessageBrowser';
import { toQueryString } from '../../util/http';

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
