import React from 'react';
import { Link } from 'react-router-dom';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { DateTimeFromTimestamp } from '../../../toolbox/timestamp';
import LiskAmount from '../../../shared/liskAmount';
import routes from '../../../../constants/routes';
import styles from './blocks.css';

const BlockRow = ({ data, className }) => (
  <Link
    className={`${grid.row} ${className} ${styles.tableRow}`}
    to={`${routes.blocks.path}?id=${data.id}`}
  >
    <span className={grid['col-xs-2']}>
      {data.height}
    </span>
    <span className={grid['col-xs-3']}>
      <DateTimeFromTimestamp time={data.timestamp * 1000} token="BTC" />
    </span>
    <span className={grid['col-xs-2']}>
      {data.numberOfTransactions}
    </span>
    <span className={grid['col-xs-2']}>
      {data.generatorUsername}
    </span>
    <span className={grid['col-xs-2']}>
      <LiskAmount val={data.totalAmount} token="LSK" />
    </span>
    <span className={grid['col-xs-1']}>
      <LiskAmount val={data.totalForged} token="LSK" />
    </span>
  </Link>
);

const areEqual = (prevProps, nextProps) => (prevProps.data.id === nextProps.data.id);

export default React.memo(BlockRow, areEqual);
