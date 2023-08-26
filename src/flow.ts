import {
  mergeCtxs,
  type OverrideObject,
  type RemoveMarker,
  type UnusedMarker,
} from './common';
import {
  type MiddlewareContext,
  type Middleware,
  type MiddlewareContextMarker,
  passthrough,
  compose,
} from './middleware';

export type CreateFlow = <TBaseContext, TMiddlewareReturn = UnusedMarker>(
  middleware: Middleware<TBaseContext, TMiddlewareReturn>
) => Flow<TBaseContext, TMiddlewareReturn>;

export type Flow<TContext, TMiddlewareReturn> = {
  <TPayload, TProcedureReturn = void>(
    procedure: FlowProcedure<
      TContext,
      TMiddlewareReturn,
      TPayload,
      TProcedureReturn
    >
  ): FlowAction<TPayload, TMiddlewareReturn, TProcedureReturn>;
  extend: <TExtendedMiddlewareReturn = UnusedMarker>(
    middleware: Middleware<TMiddlewareReturn, TExtendedMiddlewareReturn>
  ) => Flow<TMiddlewareReturn, TExtendedMiddlewareReturn>;
};

export type FlowProcedure<
  TBaseContext,
  TMiddlewareReturn,
  TPayload,
  TReturn = void
> = (
  payload: TPayload,
  ctx: RemoveMarker<
    OverrideObject<
      TBaseContext extends MiddlewareContextMarker<any>
        ? MiddlewareContext<TBaseContext>
        : TBaseContext extends object
        ? TBaseContext
        : never,
      MiddlewareContext<TMiddlewareReturn>
    >
  >
) => TReturn;

export type FlowAction<TPayload, TMiddlewareReturn, TProcedureReturn> = (
  payload: TPayload
) => FlowActionReturn<TMiddlewareReturn, TProcedureReturn> extends infer R
  ? R extends Promise<infer U>
    ? Promise<U>
    : Promise<R>
  : never;

export type FlowActionReturn<TMiddlewareReturn, TProcedureReturn> =
  UnusedMarker extends TMiddlewareReturn
    ? TProcedureReturn
    : TMiddlewareReturn extends MiddlewareContextMarker<any>
    ? TProcedureReturn
    : TMiddlewareReturn extends Record<string, any>
    ? {
        [K in keyof TMiddlewareReturn]: TMiddlewareReturn[K] extends MiddlewareContextMarker<any>
          ? TProcedureReturn
          : TMiddlewareReturn[K];
      }
    : TMiddlewareReturn;

export const createFlow = <
  TBaseContext extends object,
  TMiddlewareReturn = UnusedMarker
>(
  middleware: Middleware<TBaseContext, TMiddlewareReturn> = passthrough()
): Flow<TBaseContext, TMiddlewareReturn> => {
  const flow = <TPayload, TProcedureReturn = void>(
    procedure: FlowProcedure<
      TBaseContext,
      TMiddlewareReturn,
      TPayload,
      TProcedureReturn
    >
  ) => {
    return (payload: TPayload) => {
      return middleware(async (changes) => {
        const nextCtx = mergeCtxs({}, changes);

        const result = procedure(payload, nextCtx as any) as any;

        return Promise.resolve(result);
      }, {} as any) as any;
    };
  };

  flow.extend = (secondMiddleware) => {
    const firstMiddleware = middleware;

    return createFlow(
      !firstMiddleware
        ? secondMiddleware
        : !secondMiddleware
        ? firstMiddleware
        : (compose(firstMiddleware, secondMiddleware) as any)
    ) as any;
  };

  return flow;
};
