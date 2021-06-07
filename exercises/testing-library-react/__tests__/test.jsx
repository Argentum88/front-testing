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
  nock(host).get('/countries').query({ term: 'a' }).reply(200, ['Albania', 'Algeria', 'Armenia']);
  nock(host).get('/countries').query({ term: 'al' }).reply(200, ['Albania', 'Algeria']);
  nock(host).get('/countries').query({ term: 'alb' }).reply(200, ['Albania']);
  const { queryByText, getByRole } = render(<Autocomplete />);
  const searchInput = getByRole('textbox');
  userEvent.type(searchInput, 'a');
  await waitFor(() => {
    expect(queryByText('Albania')).toBeVisible();
    expect(queryByText('Algeria')).toBeVisible();
    expect(queryByText('Armenia')).toBeVisible();
  });

  userEvent.type(searchInput, 'l');
  await waitFor(() => {
    expect(queryByText('Albania')).toBeVisible();
    expect(queryByText('Algeria')).toBeVisible();
    expect(queryByText('Armenia')).toBeNull();
  });

  userEvent.type(searchInput, 'b');
  await waitFor(() => {
    expect(queryByText('Albania')).toBeVisible();
    expect(queryByText('Algeria')).toBeNull();
  });

  userEvent.clear(searchInput);
  await waitFor(() => {
    expect(queryByText('Albania')).toBeNull();
  });
});
// END
