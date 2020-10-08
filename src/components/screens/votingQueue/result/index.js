/* istanbul ignore file */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ResultComponent from './result';
import { transactionBroadcasted } from '../../../../actions/transactions';

const Summary = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);
  const account = useSelector(state => state.account);

  return (
    <ResultComponent
      {...props}
      t={t}
      account={account}
      transactions={transactions}
      transactionBroadcasted={params =>
        dispatch(transactionBroadcasted(params))
      }
    />
  );
};

export default Summary;
