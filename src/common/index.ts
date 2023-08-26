import { type MiddlewareContext } from '../middleware/types';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type OmitKeys<T, K extends keyof T & string> = Prettify<
  DistributiveOmit<T, K>
>;
export type PickKeys<T, K extends keyof T> = Prettify<DistributivePick<T, K>>;

export type DistributiveOmit<T, K extends string> = T extends unknown
  ? Omit<T, K>
  : never;

export type DistributivePick<T, K extends keyof T> = T extends unknown
  ? Pick<T, K>
  : never;

export type PartialBy<T, K extends keyof T & string> = Prettify<
  DistributiveOmit<T, K> & Partial<DistributivePick<T, K>>
>;

export type UnusedMarker = { __brand?: 'unused' };
export type RemoveMarker<T> = Prettify<DistributiveOmit<T, '__brand'>>;

export type OverrideObject<
  TBase extends object,
  TOverride extends object
> = Prettify<{
  [K in (keyof TBase | keyof TOverride) & string]: K extends keyof TOverride &
    string
    ? TOverride[K]
    : K extends keyof TBase & string
    ? TBase[K]
    : never;
}>;

export function mergeCtxs<TBaseContext extends object, TMiddlewareReturn>(
  baseCtx: TBaseContext,
  changes: TMiddlewareReturn
): OverrideObject<TBaseContext, MiddlewareContext<TMiddlewareReturn>> {
  const ctx =
    typeof changes === 'object' ? (changes as Record<string, object>) : {};

  return {
    ...baseCtx,
    ...ctx,
  } as OverrideObject<TBaseContext, MiddlewareContext<TMiddlewareReturn>>;
}
