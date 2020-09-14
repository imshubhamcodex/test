import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreadGroup = ({field, value, label, error, onChange}) => {
  return (
    <div className={classnames("form-group" , {'has-error' : error})}>
    <label className="control-label">{label}</label>
    <textarea
      onChange={onChange}
      value={value}
      name={field}
      className="form-control"
    />
     { error && <span className="help-block">{error}</span> }  
  </div>
  
    );
}

TextAreadGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default TextAreadGroup;