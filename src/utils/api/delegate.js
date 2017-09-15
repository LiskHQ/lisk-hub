import { requestToActivePeer } from './peers';

export const listAccountDelegates = (activePeer, address) =>
  requestToActivePeer(activePeer, 'accounts/delegates', { address });


export const listDelegates = (activePeer, options) =>
  requestToActivePeer(activePeer, `delegates/${options.q ? 'search' : ''}`, options);

export const getDelegate = (activePeer, publicKey) =>
  requestToActivePeer(activePeer, 'delegates/get', { publicKey });

export const vote = (activePeer, secret, publicKey, voteList, unvoteList, secondSecret = null) =>
  requestToActivePeer(activePeer, 'accounts/delegates', {
    secret,
    publicKey,
    delegates: voteList.map(delegate => `+${delegate}`).concat(
      unvoteList.map(delegate => `-${delegate}`),
    ),
    secondSecret,
  });

export const voteAutocomplete = (activePeer, username, votedList) => {
  const options = { q: username };

  return new Promise((resolve, reject) =>
    listDelegates(activePeer, options)
    .then((response) => {
      resolve(response.delegates.filter(delegate =>
        Object.keys(votedList).filter(item => item === delegate.username).length === 0,
      ));
    })
    .catch(reject),
  );
};

export const unvoteAutocomplete = (username, votedList) =>
  new Promise((resolve) => {
    resolve(
      Object.keys(votedList)
      .filter(delegate => delegate.indexOf(username) !== -1)
      .map(element => ({ username: element, publicKey: votedList[element].publicKey })));
  });

export const registerDelegate = (activePeer, username, secret, secondSecret = null) => {
  const data = { username, secret };
  if (secondSecret) {
    data.secondSecret = secondSecret;
  }
  return requestToActivePeer(activePeer, 'delegates', data);
};
