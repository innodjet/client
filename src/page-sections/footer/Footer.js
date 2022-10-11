import React from "react";

const Footer = () => {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <div className="cpy-right text-center py-3">
      <p>© {getYear()} NIK-DJETELI. All rights reserved.</p>
    </div>
  );
};

export default Footer;
