import React from "react";
import PropTypes from "prop-types";

const ButtonAdd = ({ title, onClick, className, style }) => {
  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {title}
    </button>
  );
};

ButtonAdd.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ButtonAdd;
