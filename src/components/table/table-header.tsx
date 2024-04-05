import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader(props: TableHeaderProps) {
  return (
    <th
      {...props}
      className={twMerge(
        'px-4 py-3 text-left text-sm font-semibold',
        props.className,
      )}
    />
  )
}
