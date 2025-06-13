import PropTypes from "prop-types";

export function Card({ children, shadow = "#E0E0E0", borderColor = "#A6A6A6", padding = "p-6", className = "", title }) {
  const shadowStyle = `shadow-[0px_4px_0px_0px_${shadow}]`;
  const borderStyle = `border-2 border-[${borderColor}]`;
  return (
    <>
      <div className={`w-full rounded-[24px] ${shadowStyle} ${padding} ${borderStyle} ${className}`}>
        {title && <p className="text-neutral-900 mb-1 text-title font-semibold">{title}</p>}
        {children}
      </div>
    </>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.string,
  borderColor: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  shadow: PropTypes.string,
};

export function CardFilled({ children, shadow = "#ADD5FF" }) {
  const shadowStyle = `shadow-[0px_4px_0px_0px_${shadow}]`;
  return (
    <>
      <div className={`flex w-full p-3 rounded-2xl flex-col bg-[#E5F2FF] ${shadowStyle}`}>{children}</div>
    </>
  );
}

CardFilled.propTypes = {
  children: PropTypes.node,
  shadow: PropTypes.string, // Added shadow to propTypes
};
