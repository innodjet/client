import React from "react";
import PropTypes from "prop-types";

const Accordion = ({ headerTitle, children, onClick, show }) => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={`accordion-button ${show ? "" : "collapsed"}`}
            type="button"
            onClick={onClick}
            aria-expanded={show}
          >
            {headerTitle}
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${show ? "show" : ""}`}
        >
          <div className="accordion-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  headerTitle: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  show: PropTypes.bool,
};

export default Accordion;
