const defaultApiVersion = '2';
/**
 * Transforms transactions of Core 3.x to the shape of
 * transactions in Core 2.x
 * We use this in order to keep forward compatibility
 *
 * @param {Object} data
 * A transaction object
 * @returns {Object}
 * Morphed transaction in the shape of Core 2.x transactions.
 */
export const txAdapter = (
  data, apiVersion = defaultApiVersion,
) => { // eslint-disable-line import/prefer-default-export
  if (apiVersion === defaultApiVersion) return data;
  const morphedData = { ...data };
  const { type } = data;

  if (type === 8 && data.asset.recipientId && data.asset.amount) {
    morphedData.recipientId = data.asset.recipientId;
    morphedData.amount = data.asset.amount;
  }
  if (type >= 8) {
    morphedData.type -= 8;
  }
  return morphedData;
};

export const adaptTransaction = (
  res, apiVersion = defaultApiVersion,
) => { // eslint-disable-line import/prefer-default-export
  if (apiVersion === defaultApiVersion) return res;
  const morphedData = res.data.map(transaction => txAdapter(transaction));
  return {
    links: res.links,
    meta: res.meta,
    data: morphedData,
  };
};

export const adaptTransactions = (
  res, apiVersion = defaultApiVersion,
) => { // eslint-disable-line import/prefer-default-export
  if (apiVersion === defaultApiVersion) return res;
  const morphedData = res.data.map(transaction => txAdapter(transaction));
  return {
    links: res.links,
    meta: res.meta,
    data: morphedData,
  };
};

export const adaptDelegateQueryParams = (params, apiVersion = defaultApiVersion) => {
  if (apiVersion === defaultApiVersion) return params;
  const morphedParams = {
    ...params,
  };
  delete morphedParams.sort;
  return morphedParams;
};