'use client';

import { useState, useEffect, useCallback } from 'react';

// SSR 安全的 localStorage 响应式 hook：
// 初始值使用 initialValue，挂载后在 useEffect 中读取，避免服务端/客户端不一致。

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        // 必须在挂载后读取 localStorage，否则会与 SSR 输出产生水合不一致，
        // 因此此处 setState 是有意为之，非意外副作用。
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // use initial value
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // quota exceeded
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
