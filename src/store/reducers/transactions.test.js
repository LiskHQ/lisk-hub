import { resetTransactionResult } from '@actions';
import { actionTypes } from '@constants';
import transactions from './transactions';

describe('Reducer: transactions', () => {
  const defaultState = {
    pending: [],
    confirmed: [],
    transactionsCreated: [],
    txSignatureError: null,
    txBroadcastError: null,
  };
  const mockTransactions = [{
    amount: 100000000000,
    id: '16295820046284152875',
    timestamp: 33505748,
  }, {
    amount: 200000000000,
    id: '8504241460062789191',
    timestamp: 33505746,
  }, {
    amount: 300000000000,
    id: '18310904473760006068',
    timestamp: 33505743,
  }];

  describe('transactionsRetrieved', () => {
    it('should prepend newer transactions and remove from state.pending', () => {
      const state = {
        ...defaultState,
        pending: [mockTransactions[0]],
        confirmed: [mockTransactions[1], mockTransactions[2]],
        count: mockTransactions[1].length + mockTransactions[2].length,
      };
      const action = {
        type: actionTypes.transactionsRetrieved,
        data: {
          confirmed: mockTransactions,
          count: mockTransactions.length,
          offset: 0,
        },
      };
      const changedState = transactions(state, action);
      expect(changedState).toEqual({
        ...defaultState,
        filters: undefined,
        confirmed: mockTransactions,
        count: mockTransactions.length,
      });
    });

    it('Should fill the empty state with fetched transactions', () => {
      const state = defaultState;
      const action = {
        type: actionTypes.transactionsRetrieved,
        data: {
          confirmed: mockTransactions,
          count: 3,
        },
      };
      const changedState = transactions(state, action);
      expect(changedState).toEqual({
        ...defaultState,
        confirmed: mockTransactions,
        count: mockTransactions.length,
      });
    });

    it('should reduce transactions when loaded with filters', () => {
      const state = {
        ...defaultState,
      };
      const data = {
        confirmed: mockTransactions,
        count: mockTransactions.length,
        filters: {
          dateFrom: '1',
          dateTo: '2',
          amountFrom: '3',
          amountTo: '4',
          message: '5',
        },
      };
      const action = { type: actionTypes.transactionsRetrieved, data };
      const changedState = transactions(state, action);
      expect(changedState).toEqual({
        ...defaultState,
        ...data,
      });
    });

    it('should reduce transactions when loaded without filters', () => {
      const state = {
        ...defaultState,
      };
      const data = {
        confirmed: mockTransactions,
        count: mockTransactions.length,
      };
      const action = { type: actionTypes.transactionsRetrieved, data };
      const changedState = transactions(state, action);
      expect(changedState).toEqual({
        ...defaultState,
        ...data,
      });
    });
  });

  describe('addNewPendingTransaction', () => {
    it('should prepend pending transactions', () => {
      const state = {
        ...defaultState,
        pending: [mockTransactions[1]],
      };
      const action = {
        type: actionTypes.addNewPendingTransaction,
        data: mockTransactions[0],
      };
      const changedState = transactions(state, action);
      expect(changedState).toEqual({ ...state, pending: [action.data, ...state.pending] });
    });
  });

  describe('emptyTransactionsData', () => {
    it('should reset all data', () => {
      const state = {
        ...defaultState,
        pending: null,
        confirmed: null,
        count: null,
        filters: null,
      };

      const expectedState = {
        ...defaultState,
        pending: [],
        confirmed: [],
        count: null,
        filters: {
          dateFrom: '',
          dateTo: '',
          amountFrom: '',
          amountTo: '',
          message: '',
        },
      };

      const action = { type: actionTypes.emptyTransactionsData };
      const changedState = transactions(state, action);
      expect(changedState).toEqual(expectedState);
    });
  });

  describe('ResetTransactionResult', () => {
    it('Should update transactions reducer for ResetTransactionResult', () => {
      const newState = {
        pending: [],
        confirmed: [],
        transactionsCreated: [],
        txSignatureError: null,
        txBroadcastError: { id: '123' },
      };
      const actionResult = resetTransactionResult();
      const changedState = transactions(newState, actionResult);
      expect(changedState.transactionsCreated).toEqual([]);
      expect(changedState.txBroadcastError).toEqual(null);
      expect(changedState.txSignatureError).toEqual(null);
    });
  });
  it('should add txBroadcastError', () => {
    const networkError = { message: 'network error' };
    const state = {
      transactionsCreated: [],
      txBroadcastError: null,
    };
    let changedState = transactions(state, {
      type: actionTypes.broadcastedTransactionError,
      data: { transaction: mockTransactions[0], error: networkError },
    });
    expect(changedState).toEqual({
      ...state,
      txBroadcastError: { error: networkError, transaction: mockTransactions[0] },
    });

    // @todo we should not be able to add more errors
    // changedState = transactions(changedState, {
    //   type: actionTypes.broadcastedTransactionError,
    //   data: { transaction: mockTransactions[1], error: networkError },
    // });
    // expect(changedState).toEqual({
    //   ...state,
    //   txBroadcastError: [
    //     { error: networkError, transaction: mockTransactions[0] },
    //     { error: networkError, transaction: mockTransactions[1] },
    //   ],
    // });
  });

  it('should not stack the same transaction in txBroadcastError and should replace it with the latest error', () => {
    const networkError = { message: 'network error' };
    const apiError = { message: 'API error' };
    const state = {
      transactionsCreated: [],
      txBroadcastError: { error: networkError, transaction: mockTransactions[0] },
    };
    const action = {
      type: actionTypes.broadcastedTransactionError,
      data: { transaction: mockTransactions[0], error: apiError },
    };
    const changedState = transactions(state, action);
    expect(changedState).toEqual({
      ...state,
      txBroadcastError: { error: apiError, transaction: mockTransactions[0] },
    });
  });

  // it('Should update transactions reducer for TransactionCreatedSuccess on RETRY', () => {
  //   const tx = {
  //     id: '12312334',
  //     senderId: '123L',
  //     recipientId: '456L',
  //     amount: '0.01',
  //     data: 'sending',
  //   };
  //   const newState = {
  //     pending: [],
  //     confirmed: [],
  //     transactionsCreated: [],
  //     txSignatureError: null,
  //     txBroadcastError: { transaction: tx },
  //   };
  //   const actionResult = broadcastedTransactionSuccess(tx);
  //   const changedState = transactions(newState, actionResult);
  //   expect(changedState.transactionsCreated).toEqual([]);
  //   expect(changedState.txBroadcastError).toEqual(null);
  // });
});
