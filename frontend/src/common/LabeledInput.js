import React from 'react';
import PropTypes from 'prop-types';


const LabeledInput = ({ label, name, ...otherProps }) => (
  <div>
    <label>
      {label || name}
      <input name={name} {...otherProps} />
    </label>
  </div>
);
LabeledInput.defaultProps = {
  label: '',
};
LabeledInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default LabeledInput;
