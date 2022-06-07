const getFullKey = (key: string) => key;

export const setItem = (key: string, value: unknown) => {
  if (window && window.localStorage) {
    window.localStorage.setItem(getFullKey(key), JSON.stringify({ value }));
  }
};

export const getItem = <T = unknown>(key: string, validate?: (input: unknown) => input is T): T | undefined => {
  if (window && window.localStorage) {
    const valueStr = window.localStorage.getItem(getFullKey(key));
    if (!valueStr) {
      return undefined;
    }
    try {
      const parsed = JSON.parse(valueStr);
      if (!parsed) {
        return undefined;
      }
      if (validate) {
        return validate(parsed.value) ? parsed.value : undefined;
      }
      return parsed.value;
    } catch {
      return undefined;
    }
  }
};
