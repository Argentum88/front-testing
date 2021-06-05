import { rest } from 'msw';
import _ from 'lodash';

let tasks = [];
export default [
  rest.get('/tasks', (req, res, ctx) => res(ctx.status(200), ctx.json(tasks))),

  rest.post('/tasks', (req, res, ctx) => {
    const id = _.uniqueId();
    const task = { ...req.body.task, id, state: 'active' };
    tasks = [...tasks, task];
    return res(
      ctx.status(201),
      ctx.json(task),
    );
  }),

  rest.delete('/tasks/:id', (req, res, ctx) => {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== id);
    return res(
      ctx.status(204),
    );
  }),
];
