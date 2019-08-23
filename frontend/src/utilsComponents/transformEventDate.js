import React from 'react';
import { convertEventDatesToNumber } from '../helpers';

function transformEventDate(WrappedComponent) {
  return (props) => {
    const { event: eventFromProps } = props; // eslint-disable-line
    const event = convertEventDatesToNumber(eventFromProps);
    return <WrappedComponent {...props} event={event} />;
  };
}

export default transformEventDate;
