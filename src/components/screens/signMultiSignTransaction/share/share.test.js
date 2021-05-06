import React from 'react';
import { mount } from 'enzyme';
import Share from './share';

describe('Sign Multisignature Tx Share component', () => {
  let wrapper;

  const props = {
    t: v => v,
  };

  it('Should render properly on success', () => {
    wrapper = mount(
      <Share
        {...props}
        transactionInfo={{ id: 1 }}
      />,
    );
    const html = wrapper.html();
    expect(html).toContain('transaction-status');
    expect(html).toContain('You have successfully signed the transaction');
    expect(html).toContain('Download');
    expect(html).toContain('Copy');
  });

  it('Should render properly on error', () => {
    wrapper = mount(
      <Share
        {...props}
        error="testerror"
      />,
    );
    const html = wrapper.html();
    expect(html).toContain('transaction-status');
    expect(html).toContain('Error: testerror');
    expect(html).toContain('Report the error via E-Mail');
  });
});