// @ts-check

require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');

const run = require('../src/application');

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

// BEGIN
test('see one empty list', () => {
  expect(document.querySelectorAll('[data-container="lists"] li').length).toEqual(1);
  expect(document.querySelector('[data-container="lists"]')).toHaveTextContent('General');
  expect(document.querySelector('[data-container="tasks"]')).toBeEmptyDOMElement();
});

test('add task', () => {
  document.querySelector('[data-testid="add-task-input"]').value = 'new task1';
  document.querySelector('[data-testid="add-task-button"]').click();
  expect(document.querySelector('[data-testid="add-task-input"]')).toBeEmptyDOMElement();
  expect(document.querySelector('[data-container="tasks"]')).toHaveTextContent('new task1');

  document.querySelector('[data-testid="add-task-input"]').value = 'new task2';
  document.querySelector('[data-testid="add-task-button"]').click();
  expect(document.querySelector('[data-container="tasks"]')).toHaveTextContent('new task1');
  expect(document.querySelector('[data-container="tasks"]')).toHaveTextContent('new task2');
});

test('work with multiple lists', () => {
  document.querySelector('[data-testid="add-task-input"]').value = 'general task';
  document.querySelector('[data-testid="add-task-button"]').click();

  document.querySelector('[data-testid="add-list-input"]').value = 'secondary';
  document.querySelector('[data-testid="add-list-button"]').click();
  expect(document.querySelector('[data-container="lists"]')).toHaveTextContent('secondary');
  document.querySelector('[data-testid="secondary-list-item"]').click();
  expect(document.querySelector('[data-container="tasks"]')).not.toHaveTextContent('general task');

  document.querySelector('[data-testid="add-task-input"]').value = 'secondary task';
  document.querySelector('[data-testid="add-task-button"]').click();
  expect(document.querySelector('[data-container="tasks"]')).toHaveTextContent('secondary task');

  document.querySelector('[data-testid="general-list-item"]').click();
  expect(document.querySelector('[data-container="tasks"]')).not.toHaveTextContent('secondary task');
  expect(document.querySelector('[data-container="tasks"]')).toHaveTextContent('general task');
});
// END
