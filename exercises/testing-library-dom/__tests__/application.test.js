// @ts-check

require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');
const testingLibraryDom = require('@testing-library/dom');
const testingLibraryUserEvent = require('@testing-library/user-event');

const run = require('../src/application');

const { screen } = testingLibraryDom;
const userEvent = testingLibraryUserEvent.default;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

// BEGIN
test('see one empty list', () => {
  expect(document.querySelector('[data-container="tasks"]')).toBeEmptyDOMElement();
  expect(document.querySelectorAll('[data-container="lists"] li').length).toEqual(1);
  expect(screen.getByText('General')).toBeVisible();
});

test('add task', () => {
  const inputForNewTask = screen.getByLabelText('New Task Name');
  userEvent.type(inputForNewTask, 'new task1');
  userEvent.click(screen.getByText('Add Task'));
  expect(inputForNewTask.value).toEqual('');
  expect(screen.getByText('new task1')).toBeVisible();

  userEvent.type(inputForNewTask, 'new task2');
  userEvent.click(screen.getByText('Add Task'));
  expect(screen.getByText('new task1')).toBeVisible();
  expect(screen.getByText('new task2')).toBeVisible();
});

test('work with multiple lists', () => {
  userEvent.type(screen.getByLabelText('New Task Name'), 'general task');
  userEvent.click(screen.getByText('Add Task'));

  userEvent.type(screen.getByLabelText('New List Name'), 'secondary');
  userEvent.click(screen.getByText('Add List'));
  expect(screen.getByText('secondary')).toBeVisible();
  userEvent.click(screen.getByText('secondary'));
  expect(screen.queryByText('general task')).toBeNull();

  userEvent.type(screen.getByLabelText('New Task Name'), 'secondary task');
  userEvent.click(screen.getByText('Add Task'));
  expect(screen.getByText('secondary task')).toBeVisible();
  userEvent.click(screen.getByText('General'));
  expect(screen.queryByText('secondary task')).toBeNull();
  expect(screen.getByText('general task')).toBeVisible();
});
// END
