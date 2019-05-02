const actionTypes = {
  accountAddVoters: 'ACCOUNT_ADD_VOTERS',
  accountAddVotes: 'ACCOUNT_ADD_VOTES',
  accountLoading: 'ACCOUNT_LOADING',
  accountLoggedIn: 'ACCOUNT_LOGGED_IN',
  accountLoggedOut: 'ACCOUNT_LOGGED_OUT',
  accountRemoved: 'ACCOUNT_REMOVED',
  accountsRetrieved: 'ACCOUNTS_RETRIEVED',
  accountSwitched: 'ACCOUNT_SWITCHED',
  accountUpdated: 'ACCOUNT_UPDATED',
  addDataToCurrencyGraph: 'ADD_DATA_TO_CURRENCY_GRAPH',
  addErrorToCurrencyGraph: 'ADD_ERROR_TO_CURRENCY_GRAPH',
  addFilter: 'ADD_FILTER',
  addPriceTicker: 'ADD_PRICE_TICKER',
  cleanTransactions: 'CLEAN_TRANSACTIONS',
  clearDataOfCurrencyGraph: 'CLEAR_DATA_OF_CURRENCY_GRAPH',
  delegateRegisteredFailure: 'DELEGATE_REGISTERED_FAILURE',
  delegateRegisteredSuccess: 'DELEGATE_REGISTERED_SUCCESS',
  delegateRetrieved: 'DELEGATE_RETRIEVED',
  delegateRetrieving: 'DELEGATE_RETRIEVING',
  delegatesAdded: 'DELEGATES_ADDED',
  delegateStatsLoaded: 'ACCOUNT_DELEGATE_STATS',
  dialogDisplayed: 'DIALOG_DISPLAYED',
  dialogHidden: 'DIALOG_HIDDEN',
  dynamicFeesRetrieved: 'DYNAMIC_FEES_RETRIEVED',
  followedAccountAdded: 'FOLLOWED_ACCOUNT_ADDED',
  followedAccountRemoved: 'FOLLOWED_ACCOUNTS_REMOVED',
  followedAccountsRetrieved: 'FOLLOWED_ACCOUNTS_RETRIEVED',
  followedAccountUpdated: 'FOLLOWED_ACCOUNT_UPDATED',
  getNewsFeed: 'GET_NEWS_FEED',
  // TODO next 3 lines should be removed after the new 'network' actions are used everywhere
  liskAPIClientReset: 'LISK_API_CLIENT_RESET',
  liskAPIClientSet: 'LISK_API_CLIENT_SET',
  liskAPIClientUpdate: 'LISK_API_CLIENT_UPDATE',
  loadingFinished: 'LOADING_FINISHED',
  loadingStarted: 'LOADING_STARTED',
  moduleAdded: 'MODULE_ADDED',
  networkSet: 'NETWORK_SET',
  networkStatusUpdated: 'NETWORK_STATUS_UPDATED',
  newBlockCreated: 'NEW_BLOCK_CREATED',
  passphraseUsed: 'PASSPHRASE_USED',
  pendingVotesAdded: 'PENDING_VOTES_ADDED',
  pricesRetrieved: 'PRICES_RETRIEVED',
  removePassphrase: 'REMOVE_PASSPHRASE',
  searchAccount: 'SEARCH_ACCOUNT',
  searchClearSuggestions: 'SEARCH_CLEAR_SUGGESTIONS',
  searchDelegate: 'SEARCH_DELEGATE',
  searchMoreTransactions: 'SEARCH_MORE_TRANSACTIONS',
  searchSuggestions: 'SEARCH_SUGGESTIONS',
  searchTransactions: 'SEARCH_TRANSACTIONS',
  searchUpdateLast: 'SEARCH_UPDATE_LAST',
  searchVoters: 'SEARCH_VOTERS',
  searchVotes: 'SEARCH_VOTES',
  secondPassphraseRegisteredFailure: 'SECOND_PASSPHRASE_REGISTRATION_FAILIRE',
  secondPassphraseRegisteredFailureReset: 'SECOND_PASSPHRASE_REGISTRATION_FAILIRE_RESET',
  sendFeedback: 'SEND_FEEDBACK',
  settingsReset: 'SETTINGS_RESET',
  settingsUpdated: 'SETTINGS_UPDATED',
  settingsUpdateToken: 'SETTINGS_UPDATE_TOKEN',
  showEmptyNewsFeed: 'SHOW_EMPTY_NEWS_FEED',
  storeCreated: 'STORE_CREATED',
  switchChannel: 'SWITCH_CHANNEL',
  toastDisplayed: 'TOAST_DISPLAYED',
  toastHidden: 'TOAST_HIDDEN',
  transactionAddDelegateName: 'TRANSACTION_ADD_DELEGATE_NAME',
  transactionAdded: 'TRANSACTION_ADDED',
  transactionCleared: 'TRANSACTION_CLEARED',
  transactionFailed: 'TRANSACTION_FAILED',
  transactionFailedClear: 'TRANSACTION_FAILED_CLEAR',
  transactionLoaded: 'TRANSACTION_LOADED',
  transactionLoadFailed: 'TRANSACTION_LOAD_FAILED',
  transactionLoadRequested: 'TRANSACTION_LOAD_REQUESTED',
  transactionsFailed: 'TRANSACTIONS_FAILED',
  transactionsFiltered: 'TRANSACTIONS_FILTERED',
  transactionsFilterSet: 'TRANSACTIONS_FILTER_SET',
  transactionsLoad: 'TRANSACTIONS_LOAD',
  transactionsLoaded: 'TRANSACTIONS_LOADED',
  transactionsLoadFinish: 'TRANSACTIONS_LOAD_FINISH',
  transactionsUpdated: 'TRANSACTIONS_UPDATED',
  updateDelegate: 'UPDATE_DELEGATE',
  voteLookupStatusCleared: 'VOTE_LOOKUP_STATUS_CLEARED',
  voteLookupStatusUpdated: 'VOTE_LOOKUP_STATUS_UPDATED',
  VotePlaced: 'VOTE_PLACED',
  votesAdded: 'VOTES_ADDED',
  votesCleared: 'VOTES_CLEARED',
  votesUpdated: 'VOTES_UPDATED',
  voteToggled: 'VOTE_TOGGLED',
  walletUpdated: 'WALLET_UPDATED',
  devicesListUpdate: 'DEVICE_LIST_UPDATE',
};

export default actionTypes;
