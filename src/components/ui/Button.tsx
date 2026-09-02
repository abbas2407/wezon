import React from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'white' | 'black';
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'white', magnetic = true, children, ...props }, forwardedRef) => {
    const magneticRef = useMagnetic({ disabled: !magnetic });
    
    // Merge both refs
    const setRefs = (node: HTMLButtonElement) => {
      // @ts-ignore
      magneticRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const variantClasses = variant === 'white' 
      ? 'text-white border-white hover:bg-white hover:text-black' 
      : 'text-black border-black hover:bg-black hover:text-white';

    return (
      <button
        ref={setRefs}
        data-cursor="hover"
        className={cn(
          'inline-flex items-center justify-center bg-transparent',
          'border border-solid rounded-none',
          'px-[28px] py-[12px]',
          'font-sora font-semibold text-[14px] tracking-[0.02em]',
          'cursor-none transition-colors duration-250 ease-in-out',
          variantClasses,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
