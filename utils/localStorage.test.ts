import { getItem, setItem } from './localStorage';

const fakeLocalStorage = (() => {
  let store: Record<string, unknown> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe('localStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  describe('setItem', () => {
    it('should not fail if no localStorage', () => {
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
      });
      setItem('test', 'hello');
    });
  });

  describe('getItem', () => {
    it('should be undefined if no value', async () => {
      expect(getItem('test3')).toBeUndefined();
    });
  });
});
