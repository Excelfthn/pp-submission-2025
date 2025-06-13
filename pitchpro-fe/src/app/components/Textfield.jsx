"use client";

import React from "react";
import PropTypes from "prop-types";

const Textfield = ({ label, type = "text", placeholder = "", value, onChange, error, className = "", ...props }) => {
  return (
    <div className={`flex flex-col items-start  w-full ${className}`}>
      {label && <p className="label text-neutral-800 font-semibold text-body mb-[6px]">{label}</p>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-[14px] bg-[#F2F2F2] rounded-[10px] border ${
          error ? "border-[#F46860]" : "border-neutral-300"
        } text-label text-neutral-800 font-[550] focus:outline-none focus:ring-2 focus:ring-[#3395FF] focus:border-transparent transition-all`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Textfield.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Textfield;
