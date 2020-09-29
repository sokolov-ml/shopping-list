import React from 'react';
import classNames from 'classnames';

import './Badge.scss';

function index({ color, onClick, className }) {
  return <i onClick={onClick} className={classNames('badge', { [`badge_color_${color}`]: color }, className)} />;
}

export default index;
