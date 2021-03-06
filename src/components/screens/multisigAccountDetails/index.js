import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { getAccount } from '@api/account';
import withData from '@utils/withData';
import { selectSearchParamValue } from '@utils/searchParams';
import { selectAccount } from '@store/selectors';
import { routes } from '@constants';
import MultisigAccountDetailsComp from './multisigAccountDetails';

const MultisigAccountDetails = ({ account, history }) => {
  const { t } = useTranslation();
  const hostAccount = useSelector(selectAccount);
  const network = useSelector(state => state.network);
  const isHost = history.location.pathname === routes.wallet.path;

  useEffect(() => {
    if (!isHost) {
      const address = selectSearchParamValue(history.location.search, 'address');
      account.loadData({ address });
    }
  }, [network]);

  return (
    <MultisigAccountDetailsComp
      t={t}
      account={isHost ? hostAccount.info.LSK : account.data}
    />
  );
};

export default compose(
  withRouter,
  withData({
    account: {
      apiUtil: (network, params) => getAccount({ network, params }, params.token),
      defaultData: {},
      getApiParams: (state) => ({
        token: state.settings.token.active,
      }),
      autoload: false,
    },
  }),
)(MultisigAccountDetails);
