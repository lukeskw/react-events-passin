import { useState, useEffect } from 'react'

export const useDebounce = (inputValue: string, delay: number) => {
  console.log(inputValue, delay)
  const [debouncedValue, setDebouncedValue] = useState(inputValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue, delay])

  return debouncedValue
}
