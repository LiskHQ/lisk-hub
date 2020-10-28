import React, { useState, useEffect } from 'react';
import Box from '../../../toolbox/box';
import BoxContent from '../../../toolbox/box/content';
import BoxFooter from '../../../toolbox/box/footer';
import { PrimaryButton } from '../../../toolbox/buttons';
import Feedback from '../../../toolbox/feedback/feedback';
import ProgressBar from '../progressBar';
import styles from './styles.css';

// eslint-disable-next-line complexity
const isInputValid = ({
  nonce, fee, type, asset,
  lsTrackingId, senderPublicKey,
  signatures,
}) => {
  const {
    amount, recipientId, mandatoryKeys, data,
    optionalKeys, numberOfSignatures,
  } = asset;

  if (
    parseInt(nonce, 10) && parseInt(fee, 10) && type === 8 && parseInt(amount, 10)
    && Array.isArray(signatures) && Array.isArray(optionalKeys) && Array.isArray(mandatoryKeys)
    && typeof recipientId === 'string' && typeof data === 'string'
    && typeof lsTrackingId === 'string' && typeof senderPublicKey === 'string'
    && typeof numberOfSignatures === 'number'
  ) {
    return true;
  }
  return false;
};

const reader = new FileReader();

const ImportData = ({ t, nextStep }) => {
  const [transaction, setTransaction] = useState(undefined);
  const [error, setError] = useState(undefined);

  const onReview = () => {
    nextStep({ transaction });
  };

  const validateAndSetTransaction = (input) => {
    try {
      const parsedInput = JSON.parse(input);
      if (!isInputValid(parsedInput)) {
        throw new Error('invalid json');
      }
      setTransaction(parsedInput);
    } catch (e) {
      setError(e);
    }
  };

  const onFileInputChange = ({ target }) => reader.readAsText(target.files[0]);
  const onPaste = (evt) => {
    const paste = evt.clipboardData.getData('text');
    validateAndSetTransaction(paste);
  };

  useEffect(() => {
    reader.onload = ({ target }) => {
      validateAndSetTransaction(target.result);
    };
  }, []);

  return (
    <section>
      <Box className={styles.boxContainer}>
        <header>
          <h1>{t('Sign multisignature transaction')}</h1>
          <p>{t('If you have received a multisignature transaction that requires your signature, use this tool to review and sign it.')}</p>
        </header>
        <BoxContent>
          <ProgressBar current={1} />
          <p className={styles.fileInputlabel}>
            {t('Paste transaction value')}
            <label className={styles.fileInputBtn}>
              {t('Read from JSON file')}
              <input
                className={`${styles.input} clickableFileInput`}
                type="file"
                accept="application/JSON"
                onChange={onFileInputChange}
              />
            </label>
          </p>
          <div className={`${styles.textAreaContainer} ${error && styles.error}`}>
            <textarea
              onPaste={onPaste}
              value={JSON.stringify(transaction)}
              readOnly
            />
            <Feedback
              message={t('Invalid file')}
              size="m"
              status={error ? 'error' : 'ok'}
            />
          </div>
        </BoxContent>
        <BoxFooter className={styles.footer}>
          <PrimaryButton
            className="confirm"
            size="l"
            onClick={onReview}
            disabled={!transaction}
          >
            {t('Review and Sign')}
          </PrimaryButton>
        </BoxFooter>
      </Box>
    </section>
  );
};

export default ImportData;