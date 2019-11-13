import React from 'react';
import PropTypes from 'prop-types';
import { GRAPH_TYPES } from './constants';
import { optionsByGraphic } from './graphicOptions';

const Graphic = ({
  type,
  data,
  width,
  height,
  options,
  customOptions,
}) => {
  const Graph = type && GRAPH_TYPES[type];

  return (
    <Graph
      data={data}
      width={width}
      height={height}
      options={customOptions || optionsByGraphic(type, options)}
    />
  );
};

Graphic.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  options: PropTypes.object,
  customOptions: PropTypes.object,
};

Graphic.defaultProps = {
  type: 'line',
  options: {},
  customOptions: null,
};

export default Graphic;
