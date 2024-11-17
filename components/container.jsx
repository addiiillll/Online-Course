import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return <div className="container mx-auto mt-10">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node
};

export default Container;