import { useState, useRef, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScramble(originalText: string, options = { disabled: false }) {
  const [text, setText] = useState(originalText);
  const intervalRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (options.disabled || window.innerWidth < 768) return;

    let iteration = 0;
    const maxIterations = 13; // ~400ms total / 30ms

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setText(originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('')
      );

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 3; // Adjust speed to settle
    }, 30);
  }, [originalText, options.disabled]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setText(originalText);
  }, [originalText]);

  return { text, startScramble, stopScramble };
}
