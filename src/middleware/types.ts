import { type UnusedMarker, type OverrideObject } from '../common';

export type MiddlewareContextMarker<TCtx extends object> = {
  __brand?: 'middleware:context';
  __ctx?: TCtx;
};

export type MiddlewareContext<Marker> = Marker extends MiddlewareContextMarker<
  infer TContext
>
  ? TContext
  : Record<string, never>;

export type ExtendMiddlewareContext<
  TContextMarker,
  TAdditionalCtx extends object
> = UnusedMarker extends TContextMarker
  ? MiddlewareContextMarker<OverrideObject<object, TAdditionalCtx>>
  : TContextMarker extends MiddlewareContextMarker<infer TCtx>
  ? MiddlewareContextMarker<OverrideObject<TCtx, TAdditionalCtx>>
  : never;

export type Middleware<TContextMarker, TReturn> = (
  next: <TAdditionalCtx extends object, TNextReturn>(
    ctx?: TAdditionalCtx
  ) => Promise<
    ExtendMiddlewareContext<TContextMarker, TAdditionalCtx> & TNextReturn
  >,
  ctx: MiddlewareContext<TContextMarker>
) => Promise<TReturn>;
