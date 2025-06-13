import React from "react";
import PropTypes from "prop-types";

const VARIANT_CLASSES = {
  primary: "bg-primary-500 text-[#f5f5f5] shadow-btn-primary",
  info: "bg-primary-200 text-primary-700 shadow-btn-info",
  success: "bg-green-500 text-white shadow-[0px_2px_0px_0px_#15803D]",
  danger: "bg-red-500 text-white shadow-[0px_2px_0px_0px_#B91C1C]",
};

const InfoButton = ({ children, className = "", type = "button", variant = "primary", ...props }) => {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

  return (
    <button type={type} className={`py-3 flex rounded-full items-center justify-center text-body font-[600] w-full ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

InfoButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "info","success", "danger"]),
};

export default InfoButton;
