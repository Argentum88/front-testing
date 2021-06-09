// @ts-check

import React from 'react';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import TodoBox from '../src/TodoBox.jsx';

axios.defaults.adapter = httpAdapter;
const host = 'http://localhost';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});

// BEGIN
test('see main page', () => {
  nock(host).get('/tasks').reply(200, []);
  render(<TodoBox />);
  expect(screen.getByPlaceholderText('I am going...')).toBeVisible();
  expect(screen.getByRole('button', { name: 'add' })).toBeVisible();
});

test('adding tasks', async () => {
  nock(host).get('/tasks').reply(200, []);
  nock(host).post('/tasks', { text: 'test1' }).reply(200, { id: 1, text: 'test1', state: 'active' });
  nock(host).post('/tasks', { text: 'test2' }).reply(200, { id: 2, text: 'test2', state: 'active' });
  render(<TodoBox />);
  const input = screen.getByPlaceholderText('I am going...');
  const submit = screen.getByRole('button', { name: 'add' });
  userEvent.type(input, 'test1');
  userEvent.click(submit);
  expect(await screen.findByText('test1')).toBeVisible();

  userEvent.type(input, 'test2');
  userEvent.click(submit);
  expect(await screen.findByText('test1')).toBeVisible();
  expect(await screen.findByText('test2')).toBeVisible();
});

test('finish and activate task', async () => {
  nock(host).get('/tasks').reply(200, [{ id: 1, text: 'text', state: 'active' }]);
  nock(host).patch('/tasks/1/finish').reply(200, { id: 1, text: 'text', state: 'finished' });
  nock(host).patch('/tasks/1/activate').reply(200, { id: 1, text: 'text', state: 'active' });
  const { container } = render(<TodoBox />);
  const task = await screen.findByText('text');
  expect(task).toBeVisible();

  userEvent.click(task);
  await waitFor(() => {
    expect(container.querySelector('s')).toBeVisible();
  });

  userEvent.click(await screen.findByText('text'));
  await waitFor(() => {
    expect(container.querySelector('s')).toBeNull();
  });
});
// END
