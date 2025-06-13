import PropTypes from 'prop-types';

export default function BasicLayout({ children, className }) {
    return (
        <div className={`min-h-screen w-full relative bg-neutral-50 ${className}`}>
            {children}
        </div>
    );
}

BasicLayout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

BasicLayout.defaultProps = {
    className: '',
};