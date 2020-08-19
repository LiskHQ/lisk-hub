import React from 'react';
import { withRouter } from 'react-router';
import BookmarksList from './bookmarksList/bookmarksList';
import { removeSearchParamsFromUrl, addSearchParamsToUrl } from '../../../utils/searchParams';
import ModalWrapper from './modalWrapper';
import styles from './bookmarks.css';

const Bookmarks = ({
  bookmarks, token, t, bookmarkRemoved, bookmarkUpdated, history,
}) => (
  <ModalWrapper>
    <BookmarksList
      enableFilter
      isEditable
      bookmarks={bookmarks}
      bookmarkRemoved={bookmarkRemoved}
      bookmarkUpdated={bookmarkUpdated}
      token={token}
      t={t}
      emptyStateClassName={styles.emptyState}
      onAddBookmark={() => {
        removeSearchParamsFromUrl(history, ['modal']);
        addSearchParamsToUrl(history, { modal: 'addBookmark' });
      }}
    />
  </ModalWrapper>
);

export default withRouter(Bookmarks);
