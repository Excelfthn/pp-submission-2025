// ContentWrapper.jsx
import PropTypes from "prop-types";

export default function ContentWrapper({ children, className }) {
  return <div className={`flex px-5 flex-col w-full  items-center ${className}`}>{children}</div>;
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContentWrapper.defaultProps = {
  className: "",
};
