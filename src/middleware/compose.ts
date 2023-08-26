/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type UnusedMarker } from '../common';
import { mergeCtxs } from '../common';
import { type Middleware } from './types';

export function compose<TM1Return, TM2Return>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>
): Middleware<UnusedMarker, TM2Return>;

export function compose<TM1Return, TM2Return, TM3Return>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>
): Middleware<UnusedMarker, TM3Return>;

export function compose<TM1Return, TM2Return, TM3Return, TM4Return>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>
): Middleware<UnusedMarker, TM4Return>;

export function compose<TM1Return, TM2Return, TM3Return, TM4Return, TM5Return>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>
): Middleware<UnusedMarker, TM5Return>;

export function compose<
  TM1Return,
  TM2Return,
  TM3Return,
  TM4Return,
  TM5Return,
  TM6Return
>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>,
  m6: Middleware<TM5Return, TM6Return>
): Middleware<UnusedMarker, TM6Return>;

export function compose<
  TM1Return,
  TM2Return,
  TM3Return,
  TM4Return,
  TM5Return,
  TM6Return,
  TM7Return
>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>,
  m6: Middleware<TM5Return, TM6Return>,
  m7: Middleware<TM6Return, TM7Return>
): Middleware<UnusedMarker, TM7Return>;

export function compose<
  TM1Return,
  TM2Return,
  TM3Return,
  TM4Return,
  TM5Return,
  TM6Return,
  TM7Return,
  TM8Return
>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>,
  m6: Middleware<TM5Return, TM6Return>,
  m7: Middleware<TM6Return, TM7Return>,
  m8: Middleware<TM7Return, TM8Return>
): Middleware<UnusedMarker, TM8Return>;

export function compose<
  TM1Return,
  TM2Return,
  TM3Return,
  TM4Return,
  TM5Return,
  TM6Return,
  TM7Return,
  TM8Return,
  TM9Return
>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>,
  m6: Middleware<TM5Return, TM6Return>,
  m7: Middleware<TM6Return, TM7Return>,
  m8: Middleware<TM7Return, TM8Return>,
  m9: Middleware<TM8Return, TM9Return>
): Middleware<UnusedMarker, TM9Return>;

export function compose<
  TM1Return,
  TM2Return,
  TM3Return,
  TM4Return,
  TM5Return,
  TM6Return,
  TM7Return,
  TM8Return,
  TM9Return,
  TM10Return
>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>,
  m6: Middleware<TM5Return, TM6Return>,
  m7: Middleware<TM6Return, TM7Return>,
  m8: Middleware<TM7Return, TM8Return>,
  m9: Middleware<TM8Return, TM9Return>,
  m10: Middleware<TM9Return, TM10Return>
): Middleware<UnusedMarker, TM10Return>;

export function compose<
  TM1Return,
  TM2Return,
  TM3Return,
  TM4Return,
  TM5Return,
  TM6Return,
  TM7Return,
  TM8Return,
  TM9Return,
  TM10Return,
  TM11Return
>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>,
  m6: Middleware<TM5Return, TM6Return>,
  m7: Middleware<TM6Return, TM7Return>,
  m8: Middleware<TM7Return, TM8Return>,
  m9: Middleware<TM8Return, TM9Return>,
  m10: Middleware<TM9Return, TM10Return>,
  m11: Middleware<TM10Return, TM11Return>
): Middleware<UnusedMarker, TM11Return>;

export function compose<
  TM1Return,
  TM2Return,
  TM3Return,
  TM4Return,
  TM5Return,
  TM6Return,
  TM7Return,
  TM8Return,
  TM9Return,
  TM10Return,
  TM11Return,
  TM12Return
>(
  m1: Middleware<UnusedMarker, TM1Return>,
  m2: Middleware<TM1Return, TM2Return>,
  m3: Middleware<TM2Return, TM3Return>,
  m4: Middleware<TM3Return, TM4Return>,
  m5: Middleware<TM4Return, TM5Return>,
  m6: Middleware<TM5Return, TM6Return>,
  m7: Middleware<TM6Return, TM7Return>,
  m8: Middleware<TM7Return, TM8Return>,
  m9: Middleware<TM8Return, TM9Return>,
  m10: Middleware<TM9Return, TM10Return>,
  m11: Middleware<TM10Return, TM11Return>,
  m12: Middleware<TM11Return, TM12Return>
): Middleware<UnusedMarker, TM12Return>;

export function compose(...middlewares: Array<any>) {
  return (next, opt): Promise<any> => {
    const run = async (index: number, ctx): Promise<any> => {
      const middleware = middlewares[index];
      if (!middleware) {
        return next(ctx);
      }

      return middleware(async (additionalCtx) => {
        return run(index + 1, mergeCtxs(ctx, additionalCtx));
      }, mergeCtxs({}, opt));
    };

    return run(0, opt);
  };
}
