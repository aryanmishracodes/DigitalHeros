import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useTextAreaResize(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string
) {
  useEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    // Reset height to calculate scrollHeight correctly
    textarea.style.height = 'auto';
    
    // Set to scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [ref, value]);
}
