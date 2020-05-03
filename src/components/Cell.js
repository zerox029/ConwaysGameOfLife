import React from 'react';

import styles from './Cell.module.css';

const Cell = ({coords, isAlive, onClick}) => (
  <div className={`${styles.cell} ${isAlive === true ? styles.alive : styles.dead}`} onClick={() => onClick(coords.cellIdx, coords.rowIdx)}></div>
);

export default Cell;