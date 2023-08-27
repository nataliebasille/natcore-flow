/* eslint-disable @typescript-eslint/ban-types */
import { expectTypeOf } from 'expect-type';
import { createFlow } from '../src/flow';
import { compose } from '../src/middleware';

describe('context', () => {
  describe('no middleware', () => {
    it('should receive payload', async () => {
      const flow = createFlow();
      const mock = jest.fn();
      const procedure = flow(mock);

      await procedure({ foo: 'bar' });
      expect(mock).toHaveBeenCalledWith({ foo: 'bar' }, {});
    });

    it('should have empty context', () => {
      const flow = createFlow();
      flow((_, ctx) => {
        expectTypeOf(ctx).toMatchTypeOf<{}>();
      });
    });

    it('query created should have correct payload type', () => {
      const flow = createFlow();
      const method = flow((_: number) => 'test');

      expectTypeOf<Parameters<typeof method>[0]>().toMatchTypeOf<number>();
    });
  });

  describe('with single middleware', () => {
    it('should have context configured by middleware', () => {
      const flow = createFlow((next) => {
        return next({
          foo: 'bar',
          baz: 1000,
        });
      });
      flow((_, ctx) => {
        expectTypeOf({
          foo: 'bar',
          baz: 1000,
        }).toEqualTypeOf<typeof ctx>();
      });
    });

    it('should infer correct ctx type when compose middleware is used', () => {
      const flow = createFlow(
        compose(
          (next) => {
            return next({
              foo: 'bar',
              foo2: 'bar2',
            });
          },
          (next) => {
            return next({
              foo: 123,
              newProp: 'newProp',
            });
          }
        )
      );

      flow((_, ctx) => {
        expectTypeOf(ctx).not.toBeNever();
        expectTypeOf({
          foo: 123,
          foo2: 'bar2',
          newProp: 'newProp',
        }).toEqualTypeOf<typeof ctx>();
      });
    });

    it('should receive the correct ctx', async () => {
      const flow = createFlow(
        compose(
          (next) => {
            return next({
              foo: 'bar',
              foo2: 'bar2',
            });
          },
          (next) => {
            return next({
              foo: 123,
              newProp: 'newProp',
            });
          }
        )
      );

      const action = flow((_: object, ctx) => {
        expect(ctx).toEqual({
          foo: 123,
          foo2: 'bar2',
          newProp: 'newProp',
        });
      });

      await action({});
    });
  });

  it('can infer middleware transform in the final result', async () => {
    const action = createFlow(async (next) => {
      const value = await next({
        foo: 'bar',
      });

      return { type: 'ok' as const, value };
    })(() => {
      return 'test value';
    });

    expectTypeOf(await action({})).toEqualTypeOf<{
      type: 'ok';
      value: string;
    }>();
  });

  it('can infer correct context from middleware when a transform is used', async () => {
    createFlow(async (next) => {
      const value = await next({
        foo: 'bar',
      });

      return { type: 'ok' as const, value };
    })((_, ctx) => {
      expectTypeOf(ctx).toEqualTypeOf<{
        foo: string;
      }>();
    });
  });

  it('should receive correct context from middleware when a transform is used', async () => {
    const action = createFlow(async (next) => {
      const value = await next({
        foo: 'bar',
      });

      return { type: 'ok' as const, value };
    })((_, ctx) => {
      expect(ctx).toEqual({
        foo: 'bar',
      });
    });

    await action({});
  });

  it('should infer correct result when middleware transform is used', async () => {
    const action = createFlow(async (next) => {
      const value = await next({
        foo: 'bar',
      });

      return { type: 'ok' as const, value };
    })((_) => {
      return 'test value';
    });

    const result = await action({});
    expectTypeOf(result).toEqualTypeOf<{
      type: 'ok';
      value: string;
    }>();
  });

  it('should receive correct result when middleware transform is used', async () => {
    const action = createFlow(async (next) => {
      const value = await next({
        foo: 'bar',
      });

      return { type: 'ok' as const, value };
    })((_) => {
      return 'test value';
    });

    const result = await action({});
    expect(result).toEqual({
      type: 'ok',
      value: 'test value',
    });
  });

  describe('extend', () => {
    it('should infer the extended context', () => {
      const flow = createFlow((next) => {
        return next({
          foo: 'bar',
        });
      }).extend((next) => {
        return next({
          foo: 123,
          newProp: 'newProp',
        });
      });

      flow((_, ctx) => {
        expectTypeOf({
          foo: 123,
          newProp: 'newProp',
        }).toEqualTypeOf<typeof ctx>();
      });
    });

    it('should receive the correct ctx', async () => {
      const flow = createFlow((next) => {
        return next({
          foo: 'bar',
        });
      }).extend((next) => {
        return next({
          foo: 123,
          newProp: 'newProp',
        });
      });

      const action = flow((_, ctx) => {
        expect(ctx).toEqual({
          foo: 123,
          newProp: 'newProp',
        });
      });

      await action({});
    });

    it('should infer correct context when a middleware transform is used', () => {
      createFlow(async (next) => {
        const value = await next({
          foo: 'bar',
        });

        return { type: 'ok' as const, value };
      }).extend((next, ctx) => {
        expectTypeOf(ctx).not.toBeNever();
        expectTypeOf({
          foo: 'bar',
        }).toEqualTypeOf<typeof ctx>;
        return next();
      });
    });
  });
});
