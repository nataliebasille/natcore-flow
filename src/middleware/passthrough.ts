import { type Middleware } from './types';

export const passthrough =
  <TBaseContext, TReturn>(): Middleware<TBaseContext, TReturn> =>
  (next) =>
    next();
