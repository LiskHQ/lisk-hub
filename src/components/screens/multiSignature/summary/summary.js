import React from 'react';
import LiskAmount from '../../../shared/liskAmount';
import Box from '../../../toolbox/box';
import BoxContent from '../../../toolbox/box/content';
import BoxFooter from '../../../toolbox/box/footer';
import Piwik from '../../../../utils/piwik';
import { PrimaryButton, SecondaryButton } from '../../../toolbox/buttons';
import AccountVisual from '../../../toolbox/accountVisual';
import { tokenMap } from '../../../../constants/tokens';
import regex from '../../../../utils/regex';
import styles from './styles.css';

const Member = ({ member, i, t }) => (
  <div className={`${styles.memberInfo} member-info`}>
    <p className={styles.memberInfoIndex}>{`${i + 1}.`}</p>
    <AccountVisual address={member.address} />
    <div className={styles.memberDetails}>
      <p className={styles.memberTitle}>
        {member.name || member.address.replace(regex.lskAddressTrunk, '$1...$3')}
        <span>{`(${member.mandatory ? t('Mandatory') : t('Optional')})`}</span>
      </p>
      <p className={styles.memberKey}>{member.publicKey.replace(regex.publicKeyTrunk, '$1...$3')}</p>
    </div>
  </div>
);

const Members = ({ members, t }) => {
  const sliceIndex = Math.round(members.length / 2);
  const leftColumn = members.slice(0, sliceIndex);
  const rightColumn = members.slice(sliceIndex, members.length);
  return (
    <div className={styles.membersContainer}>
      <p>{t('Members')}</p>
      <div>
        {leftColumn.map((member, i) =>
          <Member member={member} i={i} key={`registerMultiSignature-members-list-${i}`} t={t} />)}
      </div>
      <div>
        {rightColumn.map((member, i) =>
          <Member member={member} i={i + sliceIndex} key={`registerMultiSignature-members-list-${i + sliceIndex}`} t={t} />)}
      </div>
    </div>
  );
};

const InfoColumn = ({ title, children }) => (
  <div className={styles.infoColumn}>
    <span className={styles.infoTitle}>{title}</span>
    <span className={styles.infoValue}>
      {children}
    </span>
  </div>
);

const Summary = ({
  t,
  members = [
    {
      name: 'Wilson Geidt', address: '8195226425328336181L', publicKey: '8155694652104526882', mandatory: true,
    },
    { address: '6195226421328336181L', publicKey: '0fe9a3f1a21b5530f27f87a414b549e79a940bf24fdf2b2f05e7f22aeeecc86a', mandatory: false },
    { address: '4827364921328336181L', publicKey: '0fe9a3f1a21b5530f27f87a414b549e79a940bf24fdf2b2f05e7f22aeeecc86a', mandatory: false },
  ],
  fee = 15000000, // rawLSK
  requiredSignatures = 2,
  // account,
  // network,
  prevStep,
  nextStep,
  transactionCreatedSuccess,
  transactionCreatedError,
}) => {
  const submitTransaction = () => {
    Piwik.trackingEvent('MultiSig_SubmitTransaction', 'button', 'Sign');
    // const txData = {
    //  nonce: account.nonce,
    //  fee: `${fee}`,
    //  network,
    // };

    // const [error, tx] = await to(
    //   create(txData, transactionTypes().unlockToken.key),
    // );
    const [error, tx] = [false, { id: 1 }];

    if (!error) {
      transactionCreatedSuccess(tx);
      nextStep({ transactionInfo: tx });
    } else {
      transactionCreatedError(tx);
      nextStep({ transactionInfo: tx });
    }
  };

  return (
    <section>
      <Box className={styles.container}>
        <div className={styles.header}>
          <h1>{t('Register multisignature account')}</h1>
        </div>
        <BoxContent className={styles.content}>
          <Members members={members} t={t} />
          <div className={styles.infoContainer}>
            <InfoColumn title={t('Required Signatures')}>{requiredSignatures}</InfoColumn>
            <InfoColumn title={t('Transaction fee')}>
              <LiskAmount val={fee} token={tokenMap.LSK.key} />
            </InfoColumn>
          </div>
        </BoxContent>
        <BoxFooter className={styles.footer} direction="horizontal">
          <SecondaryButton className="go-back" onClick={prevStep}>Edit</SecondaryButton>
          <PrimaryButton className="confirm" size="l" onClick={submitTransaction}>
            {t('Sign')}
          </PrimaryButton>
        </BoxFooter>
      </Box>
    </section>
  );
};

export default Summary;