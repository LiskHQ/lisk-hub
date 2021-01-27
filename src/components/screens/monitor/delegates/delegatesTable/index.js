import React from 'react';
import { compose } from 'redux';
import withLocalSort from '../../../../../utils/withLocalSort';
import Table from '../../../../toolbox/table';
import DelegateRow from './delegateRow';
import header from './tableHeader';

const TableWrapper = compose(
  withLocalSort('delegates', 'rank:asc', {
    forgingTime: (a, b, direction) => {
      if (!a.forgingTime) return 1;
      if (!b.forgingTime) return -1;
      return ((a.forgingTime.time > b.forgingTime.time) ? 1 : -1) * (direction === 'asc' ? 1 : -1);
    },
  }),
)(({
  delegates, handleLoadMore, t, activeTab,
  changeSort, sort, canLoadMore,
}) => (
  <Table
    data={delegates.data}
    isLoading={delegates.isLoading}
    row={DelegateRow}
    loadData={handleLoadMore}
    additionalRowProps={{
      t,
      activeTab,
    }}
    header={header(activeTab, changeSort, t)}
    currentSort={sort}
    canLoadMore={canLoadMore}
  />
));

const filterDelegates = (delegates, filters) => ({
  ...delegates,
  data: filters.search
    ? delegates.data.filter(delegate => delegate.username.includes(filters.search))
    : delegates.data,
});

const selectDelegates = ({
  activeTab, delegates, standByDelegates, sanctionedDelegates, filters,
}) => {
  if (activeTab === 'active') {
    return filterDelegates(delegates, filters);
  }
  if (activeTab === 'standby') {
    return filterDelegates(standByDelegates, filters);
  }
  if (activeTab === 'sanctioned') {
    return filterDelegates(sanctionedDelegates, filters);
  }
  return undefined;
};

const DelegatesTable = ({
  delegates,
  standByDelegates,
  sanctionedDelegates,
  activeTab,
  changeSort,
  filters,
  sort,
  t,
}) => {
  const handleLoadMore = () => {
    delegates.loadData(Object.keys(filters).reduce((acc, key) => ({
      ...acc,
      ...(filters[key] && { [key]: filters[key] }),
    }), {
      offset: standByDelegates.meta.count + standByDelegates.meta.offset,
    }));
  };

  const canLoadMore = activeTab === 'active' || !standByDelegates.meta
    ? false
    : standByDelegates.data.length < (standByDelegates.meta.total - standByDelegates.meta.offset);

  const delegatesToShow = selectDelegates({
    activeTab, delegates, standByDelegates, sanctionedDelegates, filters,
  });

  return (
    <TableWrapper
      delegates={delegatesToShow}
      handleLoadMore={handleLoadMore}
      t={t}
      activeTab={activeTab}
      changeSort={changeSort}
      sort={sort}
      canLoadMore={canLoadMore}
    />
  );
};

export default DelegatesTable;
