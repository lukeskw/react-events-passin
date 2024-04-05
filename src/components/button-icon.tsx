import { ComponentProps } from 'react'

interface ButtonIconProps extends ComponentProps<'button'> {
  variant?: 'default' | 'transparent'
}

export function ButtonIcon({ variant = 'default', ...props }: ButtonIconProps) {
  return (
    <button
      {...props}
      className={
        variant === 'transparent'
          ? 'rounded-md border border-white/10 bg-black/20 p-1.5'
          : 'rounded-md border border-white/10 bg-white/10 p-1.5'
      }
    />
  )
}
