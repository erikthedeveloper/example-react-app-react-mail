import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { MessageDetail } from './MessageDetail';

describe('Component: MessageDetail', () => {
  // Minimum required props to render w/o errors/warnings
  const minProps = {
    message: {},
    deleteMessage: () => {},
    toggleFlagged: () => {},
  };

  it('renders without exploding', () => {
    expect(
      shallow(<MessageDetail {...minProps} />).length
    ).toEqual(1);
  });

  it('links back to the message listing "search" page', () => {
    expect(
      shallow(<MessageDetail {...minProps} />)
        .find('Link').props().to
    ).toEqual('/');
  });

  // Given props, render and pluck out the "Flag" button
  const renderToFlagButton =
    (props) => shallow(<MessageDetail {...props} />)
      .find('button')
      .find({onClick: props.toggleFlagged});

  it('indicates whether the message is "flagged"', () => {
    /** Given a message, assert that there is an "indicator"*/
    const hasIndicator = (message) =>
      renderToFlagButton({...minProps, message})
        .hasClass('text-red');

    expect(hasIndicator({flagged: true})).toEqual(true);
    expect(hasIndicator({flagged: false})).toEqual(false);
  });

  it('toggles "flagged" status when flag button is clicked', () => {
    const props = {
      ...minProps,
      toggleFlagged: expect.createSpy(),
    };
    renderToFlagButton(props)
      .simulate('click');
    expect(props.toggleFlagged).toHaveBeenCalled();
  });

  it('deletes itself when the "delete" button is clicked', () => {
    const props = {
      ...minProps,
      deleteMessage: expect.createSpy(),
    };
    shallow(<MessageDetail {...props} />)
      .find('button')
      .find({onClick: props.deleteMessage})
      .simulate('click');
    expect(props.deleteMessage).toHaveBeenCalled();
  });

});
