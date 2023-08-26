/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { expectTypeOf } from 'expect-type';
import { createFlow } from '../src/flow';
import { compose } from '../src/middleware';

describe('application : middleware', () => {
  describe('compose', () => {
    it('runs middleware in order', async () => {
      const m1 = jest.fn().mockImplementation((next) => {
        expect(m2).not.toHaveBeenCalled();
        expect(m3).not.toHaveBeenCalled();
        return (next as any)();
      });
      const m2 = jest.fn().mockImplementation((next) => {
        expect(m1).toHaveBeenCalled();
        expect(m3).not.toHaveBeenCalled();
        return (next as any)();
      });
      const m3 = jest.fn().mockImplementation((next) => {
        expect(m1).toHaveBeenCalled();
        expect(m2).toHaveBeenCalled();
        return (next as any)();
      });
      const composed = compose(m1, m2, m3);
      await composed(() => Promise.resolve({}) as any, {});

      expect(m1).toHaveBeenCalled();
      expect(m2).toHaveBeenCalled();
      expect(m3).toHaveBeenCalled();
    });
  });
});
