import React from "react";
import PropTypes from "prop-types";

const Input = ({
  placeholder,
  value,
  onchange,
  label,
  readOnly,
  inputType,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor="FormControlInput" className="form-label">
          {label}
        </label>
      )}
      <input
        type={inputType}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        aria-label={placeholder}
        id="FormControlInput"
        readOnly={readOnly}
      />
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onchange: PropTypes.func,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default Input;
