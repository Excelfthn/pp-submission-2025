import React from "react";
import PropTypes from "prop-types";

const VARIANT_CLASSES = {
  primary: "bg-primary-500 text-[#f5f5f5] shadow-btn-primary",
  info: "bg-primary-200 text-primary-700  shadow-[0px_2px_0px_0px_#B2D7FF]",
  success: "bg-green-500 text-white shadow-[0px_2px_0px_0px_#15803D]",
  danger: "bg-red-500 text-white shadow-[0px_2px_0px_0px_#B91C1C]",
};

const Button = ({ children,onClick, width = "w-full", className = "", type = "button", variant = "primary",disabled = false, ...props }) => {
  const variantClass = !disabled ? VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary : "";
  const disabledClass = disabled ? "bg-[#E0E0E0] text-neutral-300 shadow-[0px_2px_0px_0px_#A6A6A6] cursor-not-allowed" : "";
  return (
    <button onClick={onClick} type={type} className={`py-3 flex rounded-full items-center justify-center text-body font-[550] ${width} ${variantClass} ${className}  ${disabledClass}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "info", "success", "danger"]),
};

export default Button;
