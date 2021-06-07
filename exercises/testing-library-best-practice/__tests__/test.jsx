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

// END
