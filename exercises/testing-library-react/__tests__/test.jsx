// @ts-check

import '@testing-library/jest-dom';

import nock from 'nock';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../src/Autocomplete.jsx';

const host = 'http://localhost';

beforeAll(() => {
  nock.disableNetConnect();
});

// BEGIN
test('main', async () => {
  nock(host).get('/countries?term=a').reply(200, ['Albania', 'Algeria', 'Armenia']);
  nock(host).get('/countries?term=al').reply(200, ['Albania', 'Algeria']);
  nock(host).get('/countries?term=alb').reply(200, ['Albania']);
  const { queryByText, getByRole } = render(<Autocomplete />);
  userEvent.type(getByRole('textbox'), 'a');
  await waitFor(() => {
    expect(queryByText('Albania')).toBeVisible();
    expect(queryByText('Algeria')).toBeVisible();
    expect(queryByText('Armenia')).toBeVisible();
  });

  userEvent.type(getByRole('textbox'), 'l');
  await waitFor(() => {
    expect(queryByText('Albania')).toBeVisible();
    expect(queryByText('Algeria')).toBeVisible();
    expect(queryByText('Armenia')).toBeNull();
  });

  userEvent.type(getByRole('textbox'), 'b');
  await waitFor(() => {
    expect(queryByText('Albania')).toBeVisible();
    expect(queryByText('Algeria')).toBeNull();
  });

  userEvent.clear(getByRole('textbox'));
  await waitFor(() => {
    expect(queryByText('Albania')).toBeNull();
  });
});
// END
